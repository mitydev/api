 const mongoose = require ('mongoose');
 const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    domain: {
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
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    database: {
        type: String,
        require: true,
    },
    acessToken : {
        type: String
    }
    ,
    createdAt : {
        type: Date,
        default: Date.now
    }
})

adminSchema.pre('save' , async function(next)  {
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    this.acessToken = uuid();
    next();

});

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
