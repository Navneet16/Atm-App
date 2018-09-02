var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;


var transactionSchema = new Schema({
    cardNumber : { type: Number, required: true},
    amountWithdrawn : { type: SchemaTypes.Double , required: true },
    denomination_2000 :  { type: Number, required: true},
    denomination_500 :  { type: Number, required: true},
    denomination_100 :  { type: Number, required: true}

  },{usePushEach:true});

var transaction = mongoose.model('transactions', transactionSchema);

module.exports={
    transaction
}