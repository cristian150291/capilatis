// CONFIGURACION DE APP SERVICE

'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const usr = require('./Controllers/Session/Session');
const add = require('./Custom/activos');
const app = express();
//const fileUpload = require('express-fileupload');
const multiparty = require('connect-multiparty');



/** CONFIGURACION ARCHIVO DE RUTAS **/
console.log('Importando modulos de RUTAS.');
const routes = require('./Routes/rutes');


/** CONF MIDDLEWARES 
 * @Observations : Esto sera global, cualquier dato llegado primero se ejecuta esto
 * y lo convierte en un objeto de tipo json.
 * extended : false es una configuracion necesaria para utilizar bodyParser
 */
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use( multiparty() );
console.log('Import User Agent');
app.use( require('express-useragent').express());



/**  CONFIGURACION DE CORS SERVICE  **/
console.log('Configuracion CORS.');
app.use(( req , res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //En una app real en lugar del * se deberia ingresar el url permitidas
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/** ACTIVOS
 * @Observations : Si es un login damos de alta el activo y datos del 
 * navegador y sistema operativo que esta utilizando.
 */ 
app.use( ( req, res, next ) =>{
	
	switch( req.originalUrl ){
		case '/api/login' :

			let origen = {
				'browser' : req.useragent.browser,
				'plataform' : req.useragent.platform,
				'os' : req.useragent.os,
				'version' : req.useragent.version,
				'req' : req
			}

			add.active( origen );
			
		break;
		
	}
	
	next();
});

// EN PRIMERA INSTANCIA VALIDAMOS TOKEN,SI FALLA NO TRATAMOS DE RESOLVER LA PETICION Corregir
/*
 *const validaToken = ( req, res, next )=>{
 *  if ( req.originalUrl != '/api/login' ){
 *    if( !req.body ){
 *      usr.getUserValidate( req.body.token, ( error, decode )=>{
 *        if(decode){
 *          next();
 *        }else{
 *          return res.status(500).send({ 'error' : 'Error token invalidado : '+ error });
 *        }
 *      });
 *    }else{
 *      next();
 *    }
 *
 *  }else{
 *    next();
 *  }
 *}
 *
 *app.use(validaToken);
 */

/** UPLOAD FILES**/
console.log('Import modulo upload file');
//app.use(fileUpload());

/** CONFIGURACION RUTA PATH PRINCIPAL DE RUTAS **/
app.use('/api',routes);



/** EXPORTAMOS EL MODULO DE CONFIGURACION **/
console.log('Expotando configuracion SERVICE.');


module.exports = app; 

