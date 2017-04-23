// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
const currYear = 2017;
const startYear = 1913;
const convRates = [9.9, 10.0, 10.1, 10.9, 12.8, 15.1, 17.3, 20.0, 17.9, 16.8, 17.1, 17.1, 17.5, 17.7, 17.4, 17.1, 17.1, 16.7, 15.2, 13.7, 13.0, 13.4, 13.7, 13.9, 14.4, 14.1, 13.9, 14.0, 14.7, 16.3, 17.3, 17.6, 18.0, 19.5, 22.3, 24.1, 23.8, 24.1, 26.0, 26.5, 26.7, 26.9, 26.8, 27.2, 28.1, 28.9, 29.1, 29.6, 29.9, 30.2, 30.6, 31.0, 31.5, 32.4, 33.4, 34.8, 36.7, 38.8, 40.5, 41.8, 44.4, 49.3, 53.8, 56.9, 60.6, 65.2, 72.6, 82.4, 90.9, 96.5, 99.6, 103.9, 107.6, 109.6, 113.6, 118.3, 124.0, 130.7, 136.2, 140.3, 144.5, 148.2, 152.4, 156.9, 160.5, 163.0, 166.6, 172.2, 177.1, 179.9, 184.0, 188.9, 195.3, 201.6, 207.342, 215.303, 214.537, 218.056, 224.939, 229.594, 232.957, 236.736, 237.017, 240.007, 241.37];
// [START YourAction]
exports.inflation_calculator = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function conv1year (assistant) {
    const date = assistant.getArgument("endDate");
    var startIndex = currYear - startYear;
    var endIndex = date - startYear;
    const dollar = assistant.getArgument("amount");
    var newAmount = dollar.amount/convRates[startIndex]*convRates[endIndex];
    newAmount = parseFloat(newAmount).toFixed(2);
    assistant.ask('$' + dollar.amount + ' would be worth $' + newAmount +' in ' + date);
  }

  function conv2year (assistant) {
    const startDate = assistant.getArgument("startDate");
    const endDate = assistant.getArgument("endDate");
    var startIndex = startDate - startYear;
    var endIndex = endDate - startYear;
    const dollar = assistant.getArgument("amount");
    var newAmount = dollar.amount/convRates[startIndex]*convRates[endIndex];
    newAmount = parseFloat(newAmount).toFixed(2);
    assistant.ask('$' + dollar.amount + ' in ' + startDate + ' would be worth $' + newAmount +' in ' + endDate);
  }

  const actionMap = new Map();
  actionMap.set('conv1year', conv1year);
  actionMap.set('conv2year', conv2year);
  actionMap.set('convNow', conv2year);
  actionMap.set('conPersAmount', conv1year);
  actionMap.set('convPersAmountStart', conv2year);
  actionMap.set('convPersDate', conv1year);
  actionMap.set('convPersDateStart', conv2year);
  actionMap.set('convStart', conv2year);



  assistant.handleRequest(actionMap);
};
// [END YourAction]
