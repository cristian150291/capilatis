const mysql = require( 'mysql' );

const data_prueba = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rrhh'
};

const conexionDB = (function () {

	var instanciaDB;

	function init() {
		let con = mysql.createConnection(data_prueba);

		con.connect( (error)=>{
			if (error) console.log('Error en conexion con DB : ', error);
		}); 

		return {
			request : function (){
				return con;
			},
			close : function (){
				con.end();
			}
		};
	}

	return {
		getInstance : function() {
			if ( !instanciaDB ){
				instanciaDB = init();
			}

			return instanciaDB;
		}
	}
})();

module.exports = {
	conexionDB : conexionDB
}



