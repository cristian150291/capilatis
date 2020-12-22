/** LOGIN MODELS
 * @Observations : Modelos de estructura para nuevo usuario.
 * 
 * Solicitud por mail. 
 */
export class LoginModel {
    constructor (
        public user:string, 
        public pass:string       
    ){

    }
}
