'use strict'

const app = require('./app');
const port = '3700';

app.listen(port,'localhost',()=> {
	console.log('Servicio API CAPI-GESTION , url : localhost:3700 ruta raiz : /api/+controller');
});

