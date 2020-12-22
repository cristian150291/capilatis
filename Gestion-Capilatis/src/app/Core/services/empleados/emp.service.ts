import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../../Global';
import { NominaModel } from '../../models/dbnomina/nomina.model';


@Injectable({
	providedIn: 'root'
})
export class EmpService {

    public url:string;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService
    }
    
    /**  GET EMPLEADO
     *  @Observations Consulto y me traigo la lista de empleados
     *  @param paginador - Puede ser cualquier cosa 
     *  @param path - Se recibe el path donde realizo la consulta
     */
    getemp( paginador : any , path : string):Observable<any>{
        let headers ={ headers:Global.headers };
        return this._http.post( this.url + path, paginador , headers );
    }

    /**  EDIT EMPLEADO
     * @Observations : Obtenemos datos de empleado.
     * @param legajo - 
     * @param path - Path donde realizo la consulta
     */
    editemp( legajo : any, path : string ):Observable<any>{
        let headers ={ headers:Global.headers };
        return this._http.post<NominaModel>( this.url + path, legajo , headers );
    }

    /** SET EMPLEADO
     *  @Observations : Metodo que resuelve tanto nuevo empleado como
		 *   editar. Se debe indicar el tipo de accion para la peticion a la API.
     *  @param data - (NominaModel)
     *  @param path - Path donde realiza la consulta
		 *  @param typeAction - indicamos accion a la API ( 'NEW' or 'UPDATE' )
     *  @param token - this.vUser.getToken()
     */
    setEmployee( data : NominaModel, path : string, tipeAction : string, token : string ):Observable<any>{
        let headers ={headers:Global.headers };
				let send = {
					'date' : data,
					'tipe' : tipeAction,
					'token' : token
				};

        return this._http.post( this.url + path, send , headers );
        
    }
   
  
}

