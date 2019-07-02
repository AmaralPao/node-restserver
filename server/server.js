require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

app.get('/', function (req, res) {
  res.send('Hello World');
});



mongoose.connect(process.env.URLDB,
{useNewUrlParser:true, useCreateIndex: true},
(err,res)=>{
    if(err) throw new Error('Error de conexion a la bd');
    console.log('bd online');
});

app.listen(process.env.PORT,()=>{
    console.log('escuchando puerto',process.env.PORT);
});