/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
var app = express();
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

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

app.post('/verify/email', async function (req, res) {
  // Add your code here
  // req.body.email
  // 1. need to add template field to mailOptions
  // 2. need to configure custom handlebars
  // 3. need to enable in app usage mode for the gmail emailing automation
  console.log('SEND FROM: ', process.env.USER);

  //TODO
  // 1. Supply subject field to mailOptions
  // 2. get Dynamic Link via Firebase -> linking with intent
  // 3. apply email alias

  // transporter.use(
  //   'compile',
  //   hbs({
  //     viewEngine: 'express-handlebars',
  //     viewPath: './views/',
  //   }),
  // );

  let mailOptions = {
    from: 'user-authentication@sureplus.io',
    to: req.body.email,
    text: 'ITS WORKING!',
    subject: req.body.subject,
    //template: 'index',
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('nodemail send err!: ', err);
      res.json({ statuscode: 400, body: req.body });
    } else {
      res.json({ statuscode: 200, body: req.body });
    }
  });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
