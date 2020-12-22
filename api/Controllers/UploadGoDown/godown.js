'use strict'

const fs = require('fs');
const path = require('path');
const con = require('../../DB-connect/connectdb');


const controller = {
	getImageFile : ( req, res ) => {
		var file = req.params.image;
		var id = req.params.id;

		var path_file = './uploads/'+id+'/'+file;
		 fs.exists(path_file,(exists)=> {
				 if(exists){
						return res.sendFile(path.resolve(path_file));
				 }else{
						 return res.status(200).send({message : "No existe esa metodo"});
				 }
		 })
	}

}

module.exports = controller;
