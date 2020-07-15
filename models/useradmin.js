const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const newUserAdmin = mongoose.Schema({
   fantasy_name: {
       type: String,
       require: true, 
       default: ''
   },
   title: {
       type:String,
       require: true,
       defaut: ''
   },
   company_name: {
       type:String, 
       require: true,
       default: ''
   },
   url: {
       type: String,
       require: true, 
       lowercase: true
   },
   whatsapp: {
       type: String,
       require: true,
       default: ''
   },
   facebook: {
       type:String,
       require: true,
       default: ''
   },
   instagram: {
       type: String,
       require: true,
       default: ''
   },
   street_address: {
        type: String,
        require: true,
        default: ''
   },
   number: {
       type: Number,
       require: true,
       default: 0
   },
   city: {
       type:String,
       require: true,
       default: ''
   },
   state: {
       type:String,
       require: true,
       default: ''
   },
   country: {
       type: String,
       require: true,
       default: 'Brazil'
   },
   district: {
       type: String,
       require: true,
       default:'',
   },

   email: {
       type: String, 
       require: true,
       lowercase: true, 
       default: ''
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
   work_hour: {
       type: Object,
       require: true,
       default: {}
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

