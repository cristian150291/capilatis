import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from '../../Global';

@Injectable()
export class HelpService {

    public url:string;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService
    }

    /** FIELD HELP
     * @observations AYUDA PARA COMPLETAR LOS CAMPOS DE UN SELECT DETERMINADO
     * @param action  campo que quiero llenar
     * @param path donde apunto con la llamada
     */
    fieldHelp(action : any , path : string ):Observable<any>{
        var headers : any;
        headers ={headers: Global.headers };
        return this._http.post(this.url + path, action, headers);
    }


}