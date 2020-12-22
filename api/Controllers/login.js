// CONTROLADOR LOGIN

'use strict'
const con = require('../DB-connect/connectdb');
const usr = require('./Session/Session');
const  md5 = require('md5');

const controller = {
   getSession: ( req, res )=> {
     const data = req.body;
		 con.select( 'SELECT id,usuario,nombre,apellido,correo,imagen,activo,plataform_activo FROM administrador WHERE usuario = "'+ data.user +'" and pass = "'+ md5(data.pass) +'";', ( error, resultset )=> {
			 if ( error == '' ){
				 if( resultset.length > 0 ){
 	         return res.status(200).send({'error':'','Resulset': usr.getSession( resultset ) });
				 }else{
					 return res.status(200).send({'error':'Usuario o Contraseña incorrecto..!!!'});
				 }
			 }else{
           return res.status(500).send({'error':error});
			 }
		 });

   }

};

module.exports = controller;
