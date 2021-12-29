const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let configSchema = new Schema({
  menssage1: {
    type: String
  },
  menssage2: {
    type: String
  },
  menssage3: {
    type: String
  },
  menssage4: {
    type: String
  },
  menssage5: {
    type: String
  },
  depo: {
    type: String
  },
  trans: {
    type: String
  },  
}, {
    collection: 'config'
  })

module.exports = mongoose.model('Config', configSchema)