var mongoose = require('mongoose');
var authenticateFunctions = require('../functions/authenticationFunctions')
module.exports = {

    authenticateMethod: async function (req, res) {
        var cardNumber = req.body.cardNumber;
        var pin = req.body.pin;

        if (cardNumber === '' || cardNumber === undefined || cardNumber === null) {
            return res.json({status: false, message: "Please Enter CardNumber"});
        } else if (pin === '' || pin === undefined || pin === null) {
            return res.json({status: false, message: "Please Enter Pin"});
        } else if (cardNumber.length !== 16) {
            return res.json({status: false, message: "Enter Valid Card Number(length 16)"});
        } else if (pin.length !== 4) {
            return res.json({status: false, message: "Enter Valid Pin(length 4)"});

        } else if (isNaN(cardNumber)) {
            return res.json({status: false, message: "Enter Valid Card Number"});
        } else if (isNaN(pin)) {
            return res.json({status: false, message: "Enter Valid Pin"});
        } else {
            var cardObjectForLogin = new authenticateFunctions({cardNumber: parseInt(cardNumber), pin: parseInt(pin)})
            var authenticatecardNumber = await cardObjectForLogin.checkExistingUser().then(function (authenticatecardNumberResponse) {
                    if (authenticatecardNumberResponse.status) {
                        cardObjectForLogin.checkExistingUserPin().then(function (checkExistingUserPinResponse) {
                                if (checkExistingUserPinResponse.status) {
                                      return res.json({status: true, message: 'logged in successfully', token : checkExistingUserPinResponse.token});
                                 }else{
                                       return res.json({status: false, message: 'Incorrect Pin'});
                                     
                                 }
                            }).catch(function(checkExistingUserPinError){
                                return res.json({status: false, error: checkExistingUserPinError});
                            })
                    }else{
                        return res.json({status: false, message: 'Card Not Found'});
                    }
                }).catch(function(checkExistingUserError){
                    return res.json({status: false, error: checkExistingUserError});
                })
          }
     }
  };