
const con = require('../../DB-connect/connectdb');

const controller = {

	getHelp : ( req, res ) => {
		
		switch( req.body.action ){
			case 'sector' : 

				con.select( `SELECT * FROM dbsector ;`, ( error, result ) =>{
					if( !error ){
						return res.status(200).send({ 'error' : '', Resultset : result });
					}else{
						return res.status(500).send({ 'error' : `Error en la peticion : ${error}` });
					}
				});

				break;
			case 'grupo' :

				con.select( `SELECT * FROM dbgrupo ;`, ( error, result ) =>{
					if( !error ){
						return res.status(200).send({ 'error' : '', 'Resultset' : result });
					}else{
						return res.status(500).send({ 'error' : `Error en la peticion : ${error}` });
					}
				});

				break;
			case 'obrasocial' :

				con.select( `SELECT * FROM dbobrasocial ;`, ( error, result ) =>{
					if( !error ){
						return res.status(200).send({ 'error' : '', 'Resultset' : result });
					}else{
						return res.status(500).send({ 'error' : `Error en la peticion : ${error}` });
					}
				});

				break;
			case 'jefe' : 
				return res.status(200).send({ 'error' : '', 'Resultset' : 'Aun no tenemos definido esto' });
				//break;
		}
	}

};


module.exports = controller;
