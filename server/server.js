require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//configuracion global de rutas
app.use(require('./routes/index'));

//habilitar middleware para la carpeta de public

app.use(express.static( path.resolve(__dirname,'../public') ));

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