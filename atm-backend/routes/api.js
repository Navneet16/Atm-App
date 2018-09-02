var express = require('express');
var router = express.Router();
var  jwt = require('jsonwebtoken')

var verifyToken = function (req, res, next) {
    var authorizationHeader = req.headers['authorization'];
     if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
        if (token != undefined) {
            jwt.verify(token, "0x61B8DE7A093325542486910D0463983ffb6E65Aa", function (err, decoded) {
                if (err){
                    return res.send({ status: false, sessionExpired : true ,message: 'Session Expired' });
                } 
                else {
                    req.currentCard = decoded.id;
                    next();
                }
            });
        } else {
            return res.send({ status: false, message: 'No token provided.' });
        }
    }
    else {
        return res.send({ status: false, message: 'authorization Header is not set.' });
    }
};


var authentication = require('../api/controllers/authentication.js')
var initiateTransaction = require('../api/controllers/initiateTransaction.js')
var finalConfirmation = require('../api/controllers/finalConfirmation.js')

router.post('/authenticate', authentication.authenticateMethod)
router.post('/initiate', verifyToken ,initiateTransaction.initiateMethod)
router.post('/finalConfirm', verifyToken ,finalConfirmation.finalConfirmationMethod)

module.exports = router;
