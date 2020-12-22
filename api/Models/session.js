// MODELS LOGIN
class Session {
	constructor(usuario, token){
		this.user = usuario;
		this.token = token;
	}
}


module.exports = {
   sessionModel : Session
}
