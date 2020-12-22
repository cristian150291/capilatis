
const session = require('../../Models/session');
const jwt = require('jsonwebtoken');
const JWT_secret = 'capilatis';

const newSession = {

	/** GET SESSION
	 * @Observations : Retorna session con usuario y token.
	 * @param usuario : usuario model para la session.
	 */
	getSession : ( usuario ) => {
 	
		const fecha = new Date();
		const millis = Date.parse(fecha)/1000;

		const payload = {
			check: true,
			obj: usuario,
			iat: millis
		};

		const token = jwt.sign(payload, JWT_secret, {
			expiresIn: 3600 //expira en una hora
		});

		return JSON.parse(JSON.stringify(new session.sessionModel(usuario, token)));
	},


  /** VALIDA TOKEN DEL LOGIN
	 * @Observations : Decodifica el token con la llave manesta y retorna el callback
	 * para que se responsabilice de la logica quien lo solicite,
	 * @param token
	 * @param res Callback return ( Error , Decode )
	 */ 
	getUserValidate : ( token, res ) => {
		jwt.verify( token, JWT_secret, res ) ;
	}

};

module.exports = newSession;
