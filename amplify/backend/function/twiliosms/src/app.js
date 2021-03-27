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

  twiml.message('I am Youngmi, your authenticator!');

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
