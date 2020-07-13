const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const newUserAdmin = mongoose.Schema({
   name: {
       type: String,
       require: true
   },
   title: {
       type:String,
       defaut: ''
   },
   url: {
       type: String,
       require: true, 
       lowercase: true
   },
   email: {
       type: String, 
       require: true,
       lowercase: true
   },
   login: {
       type:String,
       require: true,
       lowercase: true,
       select: false
   },
   password: {
       type: String,
       require: true,
       select: false
   },
   token_write : {
        type: String,
   },
   token_reading: {
        type: String,
   },
   database: {
       type: String,
       require: true,
   },
   createdAt : {
       type: Date,
       default: Date.now
   }
})

newUserAdmin.pre('save' , async function(next)  {
   var hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
   this.token_reading = uuid();
   this.token_write = uuid();
   next();
});

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const UserAdmin = mongoose.model('userAdmin', newUserAdmin);

module.exports = UserAdmin;

