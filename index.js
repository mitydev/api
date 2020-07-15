
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Models
const Admin = require('./models/admin');
const Request = require('./models/pedidos');
const Root = require('./models/root');
const UserAdmin = require('./models/useradmin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.listen(3000, port);
// ==== CHAMADAS DIRETAS DA BASE DE DADOS DA TR1 ===== //
app.post('/delivery/auth', async (req, res) => {
    let connect = await mongoose.connect('mongodb://localhost/tr1_delivery', { useUnifiedTopology: true, useNewUrlParser: true });
    let { domain } = req.body;
    try {
        let user = await Admin.find({ domain: domain });
        if (user.length > 0) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (err) {
        return res.json({ err: 'Erro interno do servidor !' });
    }
});
app.post('/delivery/create', async (req, res) => {
    let connect = await mongoose.connect('mongodb://localhost/tr1_delivery', { useUnifiedTopology: true, useNewUrlParser: true });

    // console.log(req.body);
    // res.status(200).json(req.body);
    try{
        await Admin.create(req.body);
        await mongoose.connect('mongodb://localhost/' + database, { useUnifiedTopology: true, useNewUrlParser: true });
        let data = await UserAdmin.create(req.body);   
        return res.status(200).json({success: data });
    }catch (err){
        return res.json({err: err});
    }
});
// ==== CHAMADAS DIRETAS DA BASE DE DADOS DA TR1 ===== //

app.post('/delivery/request', async function (req, res) {
    let { database } = req.body;
    let connect = await mongoose.connect('mongodb://localhost/' + database, { useUnifiedTopology: true, useNewUrlParser: true });
    let data = await UserAdmin.findOne();
    console.log(data);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ err: 'Erro' });
    }
});


