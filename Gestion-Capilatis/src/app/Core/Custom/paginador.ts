import { Injectable } from '@angular/core';
//import { EmpService  } from '../services/empleados/emp.service';
import { StorageService } from '../services/storage/storage.service';
import { UsuarioModel } from '../models/usuario/usuario.model';
import { Global } from '../Global';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs-observable';


@Injectable({
	providedIn: 'root'
})
export class Paginador {

	private vUser : UsuarioModel;
	private url : string;

	constructor(
		private storage : StorageService,
		private _http : HttpClient
	){
		this.vUser = new UsuarioModel();
		this.url = Global.urlService;
	}

	/** PAGINADOR 
	 * @Observations : Metodo pare realizar la paginación de las grid del sistema.
	 *
	 * @param pag : numero de pagina actual ( string )
	 * @param evetn : evtento a realizar ( string : 'next' | 'page' )
	 * @param path : ruta a donde se realizara la peticion de la api.
	 * @returns callback : result ( data de la grid ).
	 */
	public async changePage ( pag: string , event: string, path : string, result: Function ) {

		this.vUser.setCurrentSession( this.storage.getCurrentSession() );

		let send = {
			'pag' : pag,
			'event' : event,
			'token' : this.vUser.getToken()
		}
		
		let headers = { headers : Global.headers };
		const response = await 	this._http.post( this.url + path, send, headers ).toPromise();
		result( response );

	}

}
