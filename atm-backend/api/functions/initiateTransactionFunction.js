var cardsModel = require('../models/cards.js');
var atmModel = require('../models/atm.js');
var jwt = require('jsonwebtoken');
var BigNumber = require('bignumber.js')

class initiateFunctions {
    constructor(options) {
        const defaults = {
         amountToDebit : "",
         cardNumber    : ""
        };
        const populated = Object.assign(defaults, options);
        for (const key in populated) {
          if (populated.hasOwnProperty(key)) {
            this[key] = populated[key];
          }
        }
      }
    
    getcardNumber() {
        return this.cardNumber;
    }
    getamountToDebit() {
        return this.amountToDebit;
    }
    checkMultiples(){
        return new Promise((resolve, reject) => {
            var checkMultipleOfHundred = BigNumber(this.amountToDebit).dividedBy(100).toString()
            var status = (checkMultipleOfHundred % 1 != 0) ? false : true
            resolve(status); 
      })
    }
    checkBalance(){
        return new Promise((resolve, reject) => {
            var that = this
            cardsModel.card.findOne({
                cardNumber: this.cardNumber
            }).then(function(result){
                   if(result != null){
                        if(result.Balance < that.amountToDebit){
                            resolve({
                                status : false,
                                message : "Insufficent Balance"
                            })
                        } 
                        else{
                           var twoThousand =  Math.floor(that.amountToDebit/2000);
                           var fiveHundred = Math.floor((that.amountToDebit-twoThousand*2000)/500)
                           var hundred     = Math.floor((that.amountToDebit-twoThousand*2000 - fiveHundred*500)/100)
                            resolve({
                                status : true,
                                message : "Balance Present",
                                resultBalance : result.Balance,
                                thatamountToDebit : that.amountToDebit,
                                twoThousand : twoThousand ,
                                fiveHundred : fiveHundred ,
                                hundred : hundred 
                            })
                        }
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
    calculateDenominations(){
        return new Promise((resolve, reject) => {
            var that = this
           atmModel.atm.find({}).then(function(result){
                   if(result != null){
                        if(result.Balance < that.amountToDebit){
                            resolve({
                                status : false,
                                message : "Insufficent Balance"
                            })
                        } 
                        else{
                            resolve({
                                status : true,
                                message : "Balance Present",
                                resultBalance : result.Balance,
                                thatamountToDebit : that.amountToDebit
                            })
                        }
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
}

module.exports =  initiateFunctions;
