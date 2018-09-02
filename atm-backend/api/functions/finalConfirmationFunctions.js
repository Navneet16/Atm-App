var cardsModel = require('../models/cards.js');
var atmModel = require('../models/atm.js');
var transactionModel = require('../models/transaction.js');
var jwt = require('jsonwebtoken');
var BigNumber = require('bignumber.js')

class finalConfirmationFunctions {
    constructor(options) {
        const defaults = {
            BalanceRequested : "",
            availableBalance : "",
            denomination_2000 : "",
            denomination_500 : "",
            denomination_100 : "",
            cardNumber : ""
        };
        const populated = Object.assign(defaults, options);
        for (const key in populated) {
          if (populated.hasOwnProperty(key)) {
            this[key] = populated[key];
          }
        }
      }
    
    getBalanceRequested() {
        return this.BalanceRequested;
    }
    getavailableBalance() {
        return this.amountToDebit;
    }
    getdenomination_2000(){
        return this.denomination_2000;
    }
    getdenomination_500(){
        return this.denomination_500;
    }
    getdenomination_100(){
        return this.denomination_100;
    }
    reduceBalance(){
        return new Promise((resolve, reject) => {
            var that = this
            cardsModel.card.findOne({
                cardNumber: this.cardNumber
            }).then(function(result){
                   if(result != null){
                         result.Balance = result.Balance - that.BalanceRequested
                         result.save(function(err , save){
                             if(err){
                                resolve({
                                    status : false,
                                    message : "Some Error Occured"
                                })
                             }else{
                                resolve({
                                    status : true,
                                    message : "Balance Reduced"
                                })
                             }
                         })
                    }
                   else{
                        resolve({
                            status : false,
                            message : "Card Not Found"
                        })
                   }
              })
      })
    }
    reduceAtmNotes(){
        return new Promise((resolve, reject) => {
            var that = this
           atmModel.atm.findOne({}).then(function(atmResponse){
                atmResponse.currency_denomination_2000 = atmResponse.currency_denomination_2000 - that.denomination_2000
                atmResponse.currency_denomination_500 =  atmResponse.currency_denomination_500 -   that.denomination_500
                atmResponse.currency_denomination_100 =  atmResponse.currency_denomination_100 -   that.denomination_100
                atmResponse.save(function(err , save){
                     if(err){
                        resolve({
                            status : false,
                            message : "Some Error Occured"
                        })
                     }
                     if(save){
                        resolve({
                            status : true,
                            message : "Success"
                        })
                     }
                })
            })
      }) 

    }
    saveTransaction(){
        return new Promise((resolve, reject) => {
            var transaction = new transactionModel.transaction({
                cardNumber : this.cardNumber,
                amountWithdrawn : this.BalanceRequested,
                denomination_2000 : this.denomination_2000,
                denomination_500 :  this.denomination_500,
                denomination_100 :  this.denomination_100
            })
            transaction.save(function(err, save){
               if(save){
                    resolve({
                        status : true,
                        message : "Success",
                        transaction : save
                    })
               }
               if(err){
                    resolve({
                        status : false,
                        message : "Some  Error Occured"
                    })
                }
            })
          }) 
    }
}

module.exports =  finalConfirmationFunctions;
