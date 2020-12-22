
/** CONFIGURACION DE RUTAS
 * @Observations : vamos a crear las rutas de la api, para ello debemos tener previemente 
 *  cargado los controladores que van a responder a ellos.
 */

const express = require('express');
const Login = require('../Controllers/login');
const Empleado = require('../Controllers/Empleado/empleado');
const Upload = require('../Controllers/UploadGoDown/upload');
const GoDown = require('../Controllers/UploadGoDown/godown');
const Help = require('../Controllers/Help/help');

// SERVICIO PARA LAS RUTAS
const router = express.Router();

/** MULTIPARTY
 * @Observations : Este se ejecuta antes e indica donde se guardan las imagenes
 * que se cargen. utilizando connect-multiparty
 */

const multiparty = require('connect-multiparty');
const multipartMiddeleware = multiparty({uploadDir: './uploads'});

router.post('/login', Login.getSession );
router.post('/listUser', Empleado.getListEmploye );                       // ESTE EN REALIDAD ES LISTA DE EMPLADO
router.post('/getempleado', Empleado.getEmploye );                        // RETORNA REGISTRO DE EMPLEADO
router.post('/setemployee', Empleado.setEmploye )                         // INSERTA O ACTUALIZA EMPLEADO  
//router.post('/uploadImg/:id',multipartMiddeleware, Upload.uploadImagen ); // Justo aca se ejecuta el multiparty
router.post('/uploadImg/:id', Upload.uploadImagen ); // Justo aca se ejecuta el multiparty
router.post('/uploadFile/:id', Upload.uploadFile ); 											// SUBIR ARCHIVOS ( PDF , DOCS )
router.get('/godownImg/:image/:id', GoDown.getImageFile); 										// OBTENEMOS IMAGEN
router.get('/getFileEmploye', Empleado.getFileEmploye);                   // RETORNA ULTIMO LEGAJO
router.post('/help', Help.getHelp); 																			// AYUDA DE DATOS PARA PANTALLAS / O DATOS EXTRAS

module.exports = router;

