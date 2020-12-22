import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../../models/login/login.model';
import { Global } from '../../Global';

@Injectable()
export class LoginService {

    public url:string;
  
    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;        
    }

    /** SET LOGIN
     * @Observations REALIZAMOS LOGIN DE USUARIO.
     * @param login Se envia un Model de tipo login para solicitar acceso
     * @param path Se recibe el path donde se realiza la petición
     */
    setLogin(login: LoginModel, path : string):Observable<any>{
        var headers : any;
        headers ={headers: Global.headers };
        return this._http.post(this.url + path, login, headers);
    }
    
}
