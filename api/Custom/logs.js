'use strict'
const date = require('./dates');
const con = require('../DB-connect/connectdb');
const usr = require('../Controllers/Session/Session');
 
/** AÑADIR LOG DE EVENTOS.
 * @Observations : Este metodo sirve para realizar carga de eventos en el sistema.
 * se puede ejecutar en modulos sesibles para tener un registro de quien ingresa y que funcion
 * utilizo.
 */ 
const addLog = ( message, token ) => {

	usr.getUserValidate( token, ( error, decode ) =>{
		if( decode ){

			let sql = `INSERT INTO dblog ( id_legago, fecha, observacion, hora, funcion ) VALUES ( '${decode.obj[0].id_legajo}' , '${date.getDateCurrentStringCustom()}' , '${message}' , '${date.getHourMinuteCurrent()}' , 'Funcion' );`;
			con.insert( sql, ( err, result ) =>{
				if( !error ){
					console.log(`Log insert : ${result}`);
				}else{
					console.error(`Error en logs : ${err}`);
				}
			});

		}else{

			let sql = `INSERT INTO dblog ( id_legajo, fecha, observacion, hora, funcion ) VALUES ( 'undefined', '${date.getDateCurrentStringCustom()}', '${error}', '${date.getHourMinuteCurrent()}', 'Funcion' )`;
			con.insert( sql, ( err, result ) =>{
				if( !error ){
					console.log(`Log insert : ${result}`);
				}else{
					console.error(`Error en log : ${err}`);
				}
			});
		}

		con.close();
	});
}

module.exports = addLog;
