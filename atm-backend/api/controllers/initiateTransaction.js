var mongoose = require('mongoose');
var initiateTransactionFunction = require('../functions/initiateTransactionFunction.js')
module.exports = {

    initiateMethod: async function (req, res) {
        var amountToDebit = req.body.amountToDebit;
        if (amountToDebit === '' || amountToDebit === undefined || amountToDebit === null) {
            return res.json({serverResponse: false, message: "Please Enter CardNumber"});
        }  
        else if (amountToDebit < 100) {
            return res.json({serverResponse: false, message: "Please Enter Amount above 100"});
        }
        else if (amountToDebit >= 10000) {
            return res.json({serverResponse: false, message: "Please Enter Amount Under 10000"});
        } else {
        var debitAmountObject = new initiateTransactionFunction({amountToDebit : parseInt(amountToDebit) , cardNumber : req.currentCard})
        var authenticatecardNumber = await debitAmountObject.checkMultiples().then(function (checkMultiplesResponse) {
                if (checkMultiplesResponse) {
                    debitAmountObject.checkBalance().then(function(checkBalanceResponse) {
                            if (checkBalanceResponse.status) {
                                return res.json({status: true, serverResponse: checkBalanceResponse});
                              }else{
                                   return res.json({status: false, serverResponse: checkBalanceResponse});
                             }
                        }).catch(function(checkBalanceError){
                            return res.json({status: false, error: checkBalanceError});
                        })
                }else{
                    return res.json({status: false, serverResponse: checkMultiplesResponse});
                }
            }).catch(function(checkMultiplesError){
                 return res.json({status: false, error: checkMultiplesError});
            })
         }
      }   
  };