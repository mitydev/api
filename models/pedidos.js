const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RequestSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


RequestSchema.pre('save', async function(next) {
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
const Request = mongoose.model('requests', RequestSchema);

module.exports = Request;