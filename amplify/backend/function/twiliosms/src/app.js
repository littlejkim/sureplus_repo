/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* eslint-disable no-console */

// POLYFILLS
global.WebSocket = require('ws');
global.window = global.window || {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: function () {},
  navigator: { onLine: true },
};
global.localStorage = {
  store: {},
  getItem: function (key) {
    return this.store[key];
  },
  setItem: function (key, value) {
    this.store[key] = value;
  },
  removeItem: function (key) {
    delete this.store[key];
  },
};

require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const gql = require('graphql-tag');
const {
  createUserDevice,
  onCreateUserDevice,
  listUserDevices,
  onUpdateUserDevice,
  userByUsername,
} = require('./mutations.js');

const MessagingResponse = require('twilio').twiml.MessagingResponse;
var CryptoJS = require('crypto-js');

//configuration for admin gql queries and mutation
const aws = require('aws-sdk');
aws.config.update({ region: process.env.REGION });

// const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
//   apiVersion: '2016-04-18',
// });
const cognitoSP = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: process.env.REGION,
});

const AWSAppSyncClient = require('aws-appsync').default;

let cred;
let credExpirationDate = new Date('01-01-1970'); // to keep track of if credentials are out of date

// declare a new express app
var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/****************************
 * Example post method *
 ****************************/

//1. Configure to access the gql mutation
//2. call createDeviceItem mutation from lambda
//3. client is subscribed to the mutation event. If the deviceId is the same, it will take action

const initiateAuthParams = {
  AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
  ClientId: process.env.COGNITO_CLIENT_ID, // use env variables or SSM parameters
  UserPoolId: process.env.COGNITO_USER_POOL_ID, // use env variables or SSM parameters
  AuthParameters: {
    USERNAME: process.env.ADMIN_USER_USERNAME, // use env variables or SSM parameters
    PASSWORD: process.env.ADMIN_USER_PASSWORD, // use env variables or SSM parameters
  },
};

// Get an Id Token (JWT) for the user
function getCredentials() {
  return new Promise((resolve, reject) => {
    console.log('Initializing Auth Params: ', initiateAuthParams);
    cognitoSP.adminInitiateAuth(initiateAuthParams, (authErr, authData) => {
      if (authErr) {
        console.log(authErr);
        reject(authErr);
      } else if (authData === null) {
        reject('Auth data is null');
      } else {
        console.log('Auth Successful');
        resolve(authData);
      }
    });
  });
}

function getAppSyncClient() {
  return new AWSAppSyncClient({
    disableOffline: true,
    url:
      'https://4t3zqgal2bfhriegqziwd3ft24.appsync-api.us-east-2.amazonaws.com/graphql',
    region: process.env.REGION,
    auth: {
      type: 'AMAZON_COGNITO_USER_POOLS',
      jwtToken: async () => {
        // check if we already have credentials or if credentials are expired
        if (!cred || credExpirationDate < new Date()) {
          // get new credentials
          cred = await getCredentials();
          // console.log('getCredentials() return: ', cred);
          // give ourselves a 10 minute leeway here
          credExpirationDate = new Date(
            +new Date() + (cred.AuthenticationResult.ExpiresIn - 600) * 1000,
          );
        }
        return cred.AuthenticationResult.IdToken;
      },
    },
  });
}

//calling the actual device save mutation
const client = getAppSyncClient();

async function createOnboardingDevice(deviceId, phoneNumber) {
  await client.hydrated();
  console.log('Appsync Client: ', client);
  try {
    const transactionComplete = await client.mutate({
      mutation: gql`
        ${createUserDevice}
      `,
      variables: {
        input: {
          id: deviceId,
          phoneNumber: phoneNumber,
          isVerified: false,
        },
      },
      fetchPolicy: 'no-cache',
    });
    return transactionComplete.data.createUserDevice;
  } catch (err) {
    console.log('client mutate error: ', err);
  }
}

app.post('/test/sms', async (req, res) => {
  let subscription;

  (async () => {
    await client.hydrated();
    subscription = await client
      .subscribe({
        query: gql(onCreateUserDevice),
      })
      .subscribe({
        next: (data) => {
          console.log('SUBSCRIBED Data: ', data.data.onCreateUserDevice);

          res.json({
            statuscode: 200,
            data: data.data.onCreateUserDevice,
            message: 'returned device data',
          });
        },
        error: (error) => {
          console.log('SUBSCRIPTION ERR: ', error);
          res.json({ statuscode: 401, data: [], message: 'server error' });
        },
      });
    console.log('SUBSCRIPTION object: ', subscription);
  })();

  setTimeout(() => {
    subscription.unsubscribe();
    console.log('UNSUBSCRIBING');
    res.json({ statuscode: 402, data: [], message: 'timeout' });
  }, 20000);
});

const encryptionKey = 'jioy7A!Y&h9ha90AJkJA872';
app.post('/sms', async (req, res) => {
  console.log('Request Body: ', req.body);

  var decryptedByte = CryptoJS.AES.decrypt(req.body.Body, encryptionKey);
  var deviceID = decryptedByte.toString(CryptoJS.enc.Utf8);
  var phoneNumber = req.body.From;

  //TODO
  // 1. remove response message body
  // 2. check for valid deviceID via "auth" tail string
  // 3. temporarily call gql for deviceID (Secondary Key=) and phonenumber (Primary key)
  // 4. return values back to client -> phoneNumber and isExistingUser through checking with dynamoDB
  // 5. create a webhook that calls client upon successful response back

  const twiml = new MessagingResponse();

  twiml.message('You have registered with Sureplus!');

  console.log('DeviceID: ', deviceID);
  console.log('PhoneNumber: ', phoneNumber);

  let mutationResult = await createOnboardingDevice(deviceID, phoneNumber);
  console.log('mutationResult', mutationResult);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  //res.json({ verified: true });
});

app.post('/username/check', async (req, res) => {
  // perhaps the param need to be passed from the mutation part?
  await client.hydrated();
  //console.log('REQ: ', req);
  const result = await client
    .query({
      query: gql(userByUsername),
      variables: { userName: req.body.username },
    })
    .then(({ data: { userByUsername } }) => {
      console.log(userByUsername);

      if (userByUsername.items.length === 0) {
        res.json({ isTaken: false });
      } else {
        res.json({ isTaken: true });
      }
    })
    .catch((err) => console.log(err));
});

app.post('/email/check', async (req, res) => {
  // perhaps the param need to be passed from the mutation part?
  await client.hydrated();
  //console.log('REQ: ', req);
  const result = await client
    .query({
      query: gql(userByUsername),
      variables: { email: req.body.email },
    })
    .then(({ data: { userByUsername } }) => {
      console.log(userByUsername);

      if (userByUsername.items.length === 0) {
        res.json({ isTaken: false });
      } else {
        res.json({ isTaken: true });
      }
    })
    .catch((err) => console.log(err));
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

module.exports = app;
