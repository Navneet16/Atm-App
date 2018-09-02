var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;


var atmSchema = new Schema({
    currency_denomination_2000 : { type: Number,required: true  },
    currency_denomination_500 : { type: Number,required: true  },
    currency_denomination_100 : { type: Number,required: true  },
  },{usePushEach:true});

var atm = mongoose.model('atms', atmSchema);

module.exports={
    atm
}