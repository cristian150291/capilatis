import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../Core/services/storage/storage.service';

@Injectable({
  providedIn: 'root' // just before your class
})
export class CanActivateHomePage implements CanActivate {

	constructor (
		private storage: StorageService,
		private navagacion: Router
	){

	}

	/** GUARD HOME
	 * @Observations : Se inhabilita el acceso a la ruta home y sus hijos si no se teiene
	 * una session previa, con esto nos aseguramos que navegen por las rutas son dicha session.
	 */
	canActivate(){
		if (this.storage.getCurrentSession()){
			return true;
		}else {
			this.navagacion.navigate(['']);
		}
		return false;
	}

}
