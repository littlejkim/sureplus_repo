/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var { urlencoded } = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var CryptoJS = require('crypto-js');

//configuration for admin gql queries and mutation
const aws = require('aws-sdk');
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});
const cognitoSP = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

//const AWSAppSyncClient = require('aws-appsync').default;

let cred;
let credExpirationDate = new Date('01-01-1970'); // to keep track of if credentials are out of date

// declare a new express app
var app = express();
app.use(urlencoded({ extended: false }));
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
  AuthFlow: 'ADMIN_NO_SRP_AUTH',
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

// function getAppSyncClient() {
//   return new AWSAppSyncClient({
//     disableOffline: true,
//     url:
//       'https://4t3zqgal2bfhriegqziwd3ft24.appsync-api.us-east-2.amazonaws.com/graphql',
//     region: process.env.REGION,
//     auth: {
//       type: 'AMAZON_COGNITO_USER_POOLS',
//       jwtToken: async () => {
//         // check if we already have credentials or if credentials are expired
//         if (!cred || credExpirationDate < new Date()) {
//           // get new credentials
//           cred = await getCredentials();
//           // give ourselves a 10 minute leeway here
//           credExpirationDate = new Date(
//             +new Date() + (cred.AuthenticationResult.ExpiresIn - 600) * 1000,
//           );
//         }
//         return cred.AuthenticationResult.IdToken;
//       },
//     },
//   });
// }

// Handling Requests

app.post('/update/devicelist', (req, res) => {
  console.log('FUNCTION CALLED!', req.body);
  res.json({ verified: true });
});

const encryptionKey = 'jioy7A!Y&h9ha90AJkJA872';
app.post('/sms', (req, res) => {
  console.log('Request Body: ', req.body);
  var decryptedByte = CryptoJS.AES.decrypt(req.body.Body, encryptionKey);
  var deviceID = decryptedByte.toString(CryptoJS.enc.Utf8);

  //TODO
  // 1. remove response message body
  // 2. check for valid deviceID via "auth" tail string
  // 3. temporarily call gql for deviceID (Secondary Key=) and phonenumber (Primary key)
  // 4. return values back to client -> phoneNumber and isExistingUser through checking with dynamoDB
  // 5. create a webhook that calls client upon successful response back

  const twiml = new MessagingResponse();

  //twiml.message('I am Youngmi, your authenticator!');

  console.log('DeviceID: ', deviceID);
  console.log('PhoneNumber: ', req.body.From);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  //res.json({ verified: true });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
