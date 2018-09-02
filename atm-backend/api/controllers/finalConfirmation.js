var mongoose = require('mongoose');
var finalConfirmationFunctions = require('../functions/finalConfirmationFunctions')
module.exports = {

    finalConfirmationMethod: async function (req, res) {
        var BalanceRequested = req.body.BalanceRequested;
        var availableBalance = req.body.availableBalance;
        var denomination_2000 = req.body.denomination_2000;
        var denomination_500 = req.body.denomination_500;
        var denomination_100 = req.body.denomination_100;
        if (BalanceRequested === '' || BalanceRequested === undefined || BalanceRequested === null) {
            return res.json({status: false, message: "BalanceRequested Undefined"});
        }
        else if (availableBalance === '' || availableBalance === undefined || availableBalance === null) {
            return res.json({status: false, message: "availableBalance undefined"});
        } 
        else if (denomination_2000 === '' || denomination_2000 === undefined || denomination_2000 === null) {
            return res.json({status: false, message: "denomination_2000 Undefined"});
        } 
        else if (denomination_500 === '' || denomination_500 === undefined || denomination_500 === null) {
            return res.json({status: false, message: "denomination_500 Undefined"});
        } 
        else if (denomination_100 === '' || denomination_100 === undefined || denomination_100 === null) {
            return res.json({status: false, message: "denomination_100 Undefined"});
        } 
        else {

        var finalConfirmationObject = new finalConfirmationFunctions({BalanceRequested: parseInt(BalanceRequested), availableBalance: parseInt(availableBalance)  , denomination_2000: parseInt(denomination_2000) , denomination_500: parseInt(denomination_500) , denomination_100: parseInt(denomination_100), cardNumber: parseInt(req.currentCard) })
        var authenticatecardNumber = await finalConfirmationObject.reduceBalance().then(function (reduceBalanceResponse) {
                if (reduceBalanceResponse.status) {
                    finalConfirmationObject.reduceAtmNotes().then(function (reduceAtmNotesResponse) {
                            if (reduceAtmNotesResponse.status) {
                                finalConfirmationObject.saveTransaction().then(function (saveTransactionResponse) { 
                                     if(saveTransactionResponse.status){
                                        return res.json({status: true, message: 'Transaction Success', transaction :saveTransactionResponse.transaction });
                                    }
                                    else{
                                        return res.json({status: false , message : "Some Error Occured"});
                                    }
                                }).catch(function(saveTransactionResponseError){
                                    return res.json({status: false , message : saveTransactionResponseError });
                                })
                               
                             }else{
                                   return res.json({status: false , message : "Some Error Occured"});
                                 
                             }
                        }).catch(function(reduceAtmNotesError){
                            return res.json({status: false, message : reduceAtmNotesError});
                        })
                }else{
                     return res.json({status: false, message: "Cannot Reduce User Balance"});
                }
            }).catch(function(reduceBalanceError){
                return res.json({status: false,  message: reduceBalanceError});
            })
        }
      }  
  };