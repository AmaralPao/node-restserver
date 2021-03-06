
const express = require('express');
const app = express();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdminRole}=require('../middlewares/autenticacion');



app.get('/usuario', [verificaToken,verificaAdminRole] ,(req,res)=>{



    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    Usuario.find({ estado: true },'nombre email role estado google')
                .skip(Number(desde))
                .limit(Number(limite))
                .exec((err, usuarios)=>{
                    if(err){
                        return res.status(400).json({
                            ok:false,
                            err
                        });
                    } 
                    Usuario.count({ estado: true },(err,conteo)=>{
                        res.json({
                            ok:true,
                            usuarios,
                            cuantos:conteo
                        });
                    });
                    
                });

});
 
app.post('/usuario',[verificaToken,verificaAdminRole],(req,res)=>{
    let body=req.body;

    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password, 10),
        role:body.role
    });

    usuario.save((err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        } 
        //usuarioDB.password = null;
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });


});

app.put('/usuario/:id',[verificaToken,verificaAdminRole],(req,res)=>{

    let id = req.params.id;
    let body = req.body;
    console.log(body);
    Usuario.findByIdAndUpdate(id, body , { new: true, runValidators: true },(err,usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
app.delete('/usuario/:id',[verificaToken,verificaAdminRole],(req,res)=>{
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id,(err, usuarioBorrado)=>{
    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         });
    //     } 
    //     if(!usuarioBorrado){
    //         return res.status(400).json({
    //             ok:false,
    //             err:{
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     } 
    //     res.json({
    //         ok: true,
    //         usuarioBorrado
    //     });
    // })

    Usuario.findByIdAndUpdate(id, { estado: false } , { new: true, runValidators: true },(err,usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

module.exports = app;