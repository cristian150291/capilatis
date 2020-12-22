//const mysql = require( 'mysql' );
const con = require('./mysqlconection');

/**  SELECT QUERY
 * @Observations : Seleccion de datos en tabla.
 * @params sql : string => consulta sql a realizar.
 * @params callback : ( error , result ) => callback Function.
 */ 
const selectQuery = ( sql, resulset ) =>{
	con.conexionDB.getInstance().request().query(sql, ( error, result ) => {
			if( !error ){               
				 if ( result.length > 0 ){
						resulset( '', result );
				 }else{
						resulset( error, null );	
				 }

			}else{
				console.log(`Error : ${error}`);
			}
	 });
}

/** INSERT QUERY 
 * @Observations : Insertar datos en tabla.
 * @params sql : string => sql a insertar.
 * @params callback : ( error , result ) => callback Function.
 */ 
const insertQuery = ( sql, resulset ) =>{
	con.conexionDB.getInstance().request().query( sql, ( error, result ) =>{
		if( !error ){
			if( result ){
				resulset( '', result );
			}else{
				resulset( error, null );
			}
		}else{
			console.error(`Error request : ${error}`);
		}
	});
}

/** UPDATE QUERY
 * @Observations : Update datos en tabla.
 * @param sql : string => sql update
 * @param callback : ( error , result ) => callback Function.
 */ 
const updateQuery = ( sql, resulset ) =>{
	con.conexionDB.getInstance().request().query( sql, ( error,result ) =>{
		if( !error ){
			if( result ){
				resulset( '', result );
			}else{
				resulset( error, null );
			}
		}else{
			console.error(`Error resquet : ${error}`);
		}
	});
}

/** FIN DE CONEXION CON LA BASE DE DATOS.
 * @Observations : Metodo para realizar el cierre de conexion
 * con la base de datos.
 */ 
const closeQuery = ()=>{
	con.conexionDB.getInstance().close();
}
	

module.exports = {
	select : selectQuery,
	insert : insertQuery,
	update : updateQuery,
	close  : closeQuery
}
