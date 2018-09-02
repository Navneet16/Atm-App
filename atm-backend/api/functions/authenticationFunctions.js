var cardsModel = require('../models/cards.js');
var jwt = require('jsonwebtoken');

class authenticateFunctions {
    constructor(options) {
        const defaults = {
         cardNumber : "",
         pin : "",
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
    getPin(){
       return this.pin
    }
    checkExistingUser(){
        return new Promise((resolve, reject) => {
            cardsModel.card.findOne({
              cardNumber: this.cardNumber
          }).then(function(result){
               if(result != null){
                    resolve({
                        status : true,
                        message : "User Found"
                    })
               }
               else{
                    resolve({
                        status : false,
                        message : "User Not Found"
                    })
               }
          })
      })
    }
    checkExistingUserPin(){
        return new Promise((resolve, reject) => {
            cardsModel.card.findOne({
                cardNumber: this.cardNumber,
                pin : this.pin
            }).then(function(result){
                   if(result != null){
                        resolve({
                            status : true,
                            message : "User Authenticated",
                            token : jwt.sign({
                                id: result.cardNumber
                            }, "0x61B8DE7A093325542486910D0463983ffb6E65Aa", {
                                expiresIn: 30 * 60
                            })
                        })
                   }
                   else{
                        resolve({
                            status : false,
                            message : "Pin Did Not Match"
                        })
                   }
              })
          }) 

    }
}

module.exports =  authenticateFunctions;
