'use strict'

const date = require('./dates');
const con = require('../DB-connect/connectdb');
const usr = require('../Controllers/Session/Session');
 
const add = {

	active : ( data ) =>{
		
		let sql = `UPDATE administrador SET `
	},
	disconect : ( data ) => {

	}

};

module.exports = add;
