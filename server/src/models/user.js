const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: Number,
    email: String,
    password: String,
    online: Boolean
  });
   
  const User = mongoose.model('User', userSchema);
  module.exports = User;