'use strict'

const con = require('../../DB-connect/connectdb');
const custom = require('../../Custom/funciones');
const usr = require('../Session/Session');

const controller = {

	/** OBTENER LISTA DE EMPLAEDOS, PAGINADO CON '../../Custom/funciones.js' **/
	getListEmploye: ( req, res ) => {
		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
					const dataPaginacion = custom.paginador(req);
					con.select('SELECT * FROM dbnomina LIMIT '+ dataPaginacion.inicio+' ,'+ dataPaginacion.final+';', ( error, result ) =>{
						if( error == '' ){
							if ( result.length > 0 ){
								let countTuplas = result.length;
								let countPag = Math.ceil( ( countTuplas / 20  ) );
								return res.status(200).send({'error' : '', 'Resulset' : result, 'count' : result.length, 'pag' : countPag, 'cantTuplas' : countTuplas, 'actual' : dataPaginacion.pagActual, 'token' : usr.getSession(decode.obj[0]).token });
							}else{
								return res.status(500).send({'error' : 'No list'});
							}
						}else{
							return res.status(500).send({'error' : `Error en la consulta listuser : ${error}` });
						}
					});
			}else{
				return res.status(200).send({ 'error' : `Error en la session : ${error}` });
			}
		});
	
	},

	/** OBTEBER EMPLEADO POR LEGAJO **/
	getEmploye : ( req, res ) =>{

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){

					let legajo = req.body.legajo;
					con.select('SELECT * FROM dbnomina WHERE id_legajo ='+legajo+';', ( error, result )=>{
						if (error == ''){
							if( result.length > 0 ){
								return res.status(200).send({'error' : '', 'Resulset' : result, 'token' : usr.getSession( decode.obj[0] ).token });
							}else{
									return res.status(200).send({'error' : 'No Empleado'});
							}
						}else{
								return res.status(500).send({'error' : 'Error en la consulta getEmpleado'});
						}
					});

			}else{
				res.status(200).send({ 'error' : 'Error de session : '+error });
			}
		});

	},

	/** INSERTAR EMPLEADO **/
	setEmploye : ( req, res ) => {

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
				
				switch( req.body.tipe ){

					case 'NEW':
							let sqlInsert = getSqlInsertEmployee( req.body.date );
							con.insert( sqlInsert , ( error, result ) =>{
								if( error == '' ){
									return res.status(200).send({ 'error' : '', 'Resulset' : result, 'token' : usr.getSession( decode.obj[0].token ) });
								}else{
									return res.status(200).send({ 'error' : `Error al realizar la consulta : ${error}.` });
								}
							});

						break;

					case 'UPDATE':
						let sqlUpdate = `UPDATE dbnomina SET ${getSqlUpdateEmployee(req.body.date)} WHERE id_legajo = ${req.body.date.id_legajo} ;`;
						con.update( sqlUpdate, ( error, result ) =>{
							if( error == '' ){
								return res.status(200).send({ 'error' : '', 'Resulset' : 'OK' , 'token' : usr.getSession( decode.obj[0].token )});
							}else{
								return res.status(200).send({ 'error' : `Error al realizar la consulta : ${error}` });
							}
						});
						 
						break;
				}

			}else{
				return res.status(200).send({ 'error' : `Error en session : ${error}` });
			}
		});

	},
	
	/** RETORNO ULTIMO NUMERO DE LEGAJO **/
	getFileEmploye : ( req, res ) =>{

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
				con.select( 'CALL getFileEmploye', ( error, result ) =>{
					if( error == '' ){
						return res.status(200).send({ 'Error' : '', 'Resulset' : result[0] , 'token' : usr.getSession( decode.obj[0] ) });
					}else{
						return res.status(500).send({ 'error' : `Error al realizar la peticion : ${error}.` });
					}
				});
			}else{
				return res.status(200).send({ 'error' : `Error en la session : ${error}` });
			}
		});

	}

};

module.exports = controller;


/** OBTENER DATOS SQL INSERT 
 * @Observations : Obtenemos datos sql insert de dbnomina en formato de string
 * @param data : Object => datos del request.
 * @returns sql : string.
 */ 
const getSqlInsertEmployee = ( data ) =>{
	let sql = 'INSERT INTO dbnomina (`id_legajo`, `nombre`, `cuil`, `fecha_ingreso`, `fecha_nacimiento`, `activo`, `fecha_egreso`, `categoria`, `mail`, `art`, `poliza`, `foto`, `alta_afip`, `foto_dni`, `foto_dnidso`, `cert_cuil`, `calle`, `numero`, `piso`, `localidad`, `provincia`, `codp`, `telefono`, `celular`, `usuario_carga`, `fecha_carga`, `usuario_update`, `fecha_update`, `orden`, `presentismo`, `almuerzo`, `t_almuerzo`, `hsextra`, `t_hsextra`, `premio`, `t_premio`, `sector`, `grupo`, `o_social`, `jefe`, `osexcedente`, `motivo`, `observaciones`, `plan`, `vacaciones`, `viaticos`, `tcelular`, `cursos`, `convenio`,`id_sector`,`id_grupo`,`id_o_social`) ';

	let fecha = new Date();
	let fechadepaso = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`;

		sql += ` VALUES ( '${data.id_legajo}' ,
										  '${data.nombre}' , 
											'${data.cuil}' ,
											'${fechadepaso}' ,
											'${fechadepaso}' ,
											${0} ,
											'${fechadepaso}' , 
											'${data.categoria}' ,
											'${data.mail}' ,
											'${data.art}' , 
											'${data.poliza}' ,
											'${data.foto}' ,
											'${data.alta_afip}' ,
											'${data.foto_dni}' ,
											'${data.foto_dnidso}' ,
											'${data.cert_cuil}' , 
											'${data.calle}' , 
											'${data.numero}' ,
											'${data.piso}' ,
											'${data.localidad}' ,
											'${data.provincia}' ,
											'${data.codp}' ,
											'${data.telefono}' ,
											'${data.celular}' ,
											'${data.usuario_carga}' ,
											'${fechadepaso}' ,
											'${data.usuario_update}' ,
											'${fechadepaso}' ,
											${0} ,
											${0} ,
											${0} ,
											'${data.t_almuerzo}' ,
											${0} ,
											'${data.t_hsextra}' ,
											${0} ,
											'${data.t_premio}' ,
											'${data.sector}' ,
											'${data.grupo}' ,
											'${data.o_social}' ,
											'${data.jefe}' ,
											${0} ,
											'${data.motivo}' ,
											'${data.observaciones}' ,
											'${data.plan}' ,
											${0} ,
											${0} ,
											${0} ,
											${0} ,
											'${data.convenio}', 
											${1},
											${1},
											${1}
											);`;
		return sql;
}


/** OBTENER STRING SQL UPDATE.
 * @Observations : Arma string ( key : value ) para enviar a la 
 * base de datos.
 * @param data : Object => datos del request.
 * @returns sql : string => string sql update.
 */ 
const getSqlUpdateEmployee = ( data ) =>{
	let fecha = new Date();
	let fechadepaso = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`;
	let sql = `id_legajo = '${data.id_legajo}',
						 nombre = '${data.nombre}', 
						 cuil = '${data.cuil}',
						 fecha_ingreso = '${fechadepaso}',
						 fecha_nacimiento = '${fechadepaso}', 
						 activo = ${0},
						 fecha_egreso = '${fechadepaso}',
						 categoria = '${data.categoria}',
						 mail = '${data.mail}', 
						 art = '${data.art}',
						 poliza = '${data.poliza}',
						 alta_afip = '${data.alta_afip}',
						 foto_dni = '${data.foto_dni}',
						 foto_dnidso = '${data.foto_dnidso}',
						 cert_cuil = '${data.cert_cuil}',
						 calle = '${data.calle}',
						 numero = '${data.numero}',
						 piso = '${data.piso}',
						 localidad = '${data.localidad}',
						 provincia = '${data.provincia}',
						 codp = '${data.codp}', 
						 telefono = '${data.telefono}',
						 celular = '${data.celular}',
						 usuario_carga = '${data.usuario_carga}',
						 fecha_carga = '${fechadepaso}', 
						 usuario_update = '${data.usuario_update}',
						 fecha_update = '${fechadepaso}',
						 orden = ${0}, 
						 presentismo = ${0},
						 almuerzo = ${0},
						 t_almuerzo = '${data.t_almuerzo}',
						 hsextra = ${0},
						 t_hsextra = '${data.t_hsextra}',
						 premio = ${0},
						 t_premio = '${data.t_premio}',
						 sector = '${data.sector}',
						 grupo = '${data.grupo}',
						 o_social = '${data.o_social}',
						 jefe = '${data.jefe}', 
						 osexcedente = ${0},
						 motivo = '${data.motivo}',
						 observaciones = '${data.observaciones}',
						 plan = '${data.plan}',
						 vacaciones = ${0},
						 viaticos = ${0},
						 tcelular = ${0},
						 cursos = ${0},
						 convenio = '${data.convenio}',
						 id_sector = ${data.id_sector},
						 id_grupo = ${data.id_grupo},
						 id_o_social = ${data.id_o_social} `;
						 //foto = '${data.foto}',

	return sql;
}
