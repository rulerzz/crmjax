const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  name: { 
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  phone: { 
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: false }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;