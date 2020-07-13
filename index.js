
const express = require('express');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Models
const Admin = require('./models/admin');
const Request = require('./models/pedidos');
const Root = require('./models/root');
const UserAdmin = require('./models/useradmin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, port);
mongoose.Promise = global.Promise;

// ==== CHAMADAS DIRETAS DA BASE DE DADOS DA TR1 ===== //
app.post('/delivery/auth', async (req, res) => {
    let connect = await mongoose.connect('mongodb://localhost/tr1_delivery', { useUnifiedTopology: true, useNewUrlParser: true });
    let { domain } = req.body;
    try{
        let user = await Admin.find({ domain: domain });
        if(user.length > 0){
            res.status(200).json({success: true, data: user});
        }else{
            res.status(401).json({success: false});
        }
    }catch (err){
        return res.json({err: 'Erro interno do servidor !'});
    }
});
app.post('/delivery/client', async function(req, res){
    await mongoose.connect('mongodb://localhost/tr1_delivery', { useUnifiedTopology: true, useNewUrlParser: true });


});
app.post('/delivery/create', async (req, res) => {
    let connect = await mongoose.connect('mongodb://localhost/tr1_delivery', { useUnifiedTopology: true, useNewUrlParser: true });
    var { database } = req.body;
    try{
        await Admin.create(req.body);
        await mongoose.connect('mongodb://localhost/' + database, { useUnifiedTopology: true, useNewUrlParser: true });
        await UserAdmin.create(req.body);   
        return res.status(200).json({success: 'success'});
    }catch (err){
        return res.json({err: err});
    }
});
// ==== CHAMADAS DIRETAS DA BASE DE DADOS DA TR1 ===== //

app.post('/delivery/request', async function(req, res){
    let { database } = req.body;
    let connect = await mongoose.connect('mongodb://localhost/' + database, { useUnifiedTopology: true, useNewUrlParser: true });
    let data = await UserAdmin.findOne();
    console.log(data);
    if(data){
        res.status(200).json(data);
    }else{
        res.status(500).json({err: 'Erro'});
    }
}); 

