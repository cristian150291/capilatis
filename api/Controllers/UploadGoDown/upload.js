'use strict'

const fs = require('fs');
const path = require('path');
const con = require('../../DB-connect/connectdb');


const controller = {
	uploadImagen : ( req, res ) => {
	
		if( req.files ){

			const legajoEmpleado = req.params.id;
			let filePath = req.files.image.path;
			let fileSplit = filePath.split('/');
			let fileName = fileSplit[2];
			let extensionSplit = fileName.split('.');
			let extension = extensionSplit[1];

			if( extension == 'jpg' || extension == 'png' || extension == 'gif' || extension == 'icon' ){

				upload( fileName, filePath, legajoEmpleado );

				let sql = 'UPDATE dbnomina SET foto = "'+fileName+'" WHERE id_legajo = "'+legajoEmpleado+'"'; 
				con.update( sql , ( error, result ) =>{
					if( result ){
						return res.status(200).send({ 'error' : '' });
					}else{
						return res.status(500).send({'error' : 'No se pudo subir la imagen : '+ error });
					}
				});
			}else{
				 fs.unlink(filePath, (err) =>{
					 return res.status(200).send({message : 'La extencion no es valida : ' + err});
				 });
			}
		}else{
			return res.status(500).send({'error' : 'Error en la carga de datos.' });
		}

	},

	uploadFile : ( req,  res ) => {

		if( req.files ){

			const legajoEmpleado = req.params.id;
	
			console.log( req.files.files.path );

			let filePath = req.files.files.path;
			let fileSplit = filePath.split('/');
			let fileName = fileSplit[2];

			console.table( fileSplit );

			let extensionSplit = fileName.split('.');
			let extension = extensionSplit[1];
			

			if( extension == 'pdf' || extension == 'docs' || extension == 'json' ){
				let file = req.files.file;

				upload( fileName, filePath, legajoEmpleado );

			}

		}else{
			return res.status(400).send({ 'error' : `No hay archivos seleccionados.` });
		}

	}

}


const upload = ( fileName , filePath, folder ) =>{

		try { fs.mkdirSync('./uploads/'+folder); } catch(e) { if ( e.code != 'EEXIST' ) throw e; }
		const is = fs.createReadStream(filePath);
		const os = fs.createWriteStream(`./uploads/${folder}/${fileName}`);

		is.pipe(os);

		is.on('end', ()=>{
			fs.unlinkSync(filePath);
		});

}

module.exports = controller;
