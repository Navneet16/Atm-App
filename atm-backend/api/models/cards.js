var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;


var cardSchema = new Schema({
    cardNumber : { type: Number,required: true  },
    pin  : { type: Number, required: true  },
    Balance : { type: SchemaTypes.Double , required: true  },

  },{usePushEach:true});

var card = mongoose.model('cards', cardSchema);

module.exports={
    card
}