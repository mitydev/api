const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const newRootSchema = mongoose.Schema({
   name: {
       type: String,
       require: true
   },
   login: {
       type:String,
       require: true,
       lowercase: true
   },
   password: {
       type: String,
       require: true,
       select: false
   },
   createdAt : {
       type: Date,
       default: Date.now
   }
})

newRootSchema.pre('save' , async function(next)  {
   var hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
   next();
});

const Root = mongoose.model('root', newRootSchema);

module.exports = Root;
