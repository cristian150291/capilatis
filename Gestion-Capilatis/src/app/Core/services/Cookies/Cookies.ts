import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class CookieServiceApp {

	constructor(
		private cookie : CookieService
	){}

	setCookie ( key: string , value: string ):void {
		this.cookie.set(key,value);
	}

	getCookie ( key: string ):string {
		return this.cookie.get(key);
	}

	deleteCookie ( key: string ):void {
		this.cookie.delete(key);
	}

	deleteAll ():void {
		this.cookie.deleteAll();
	}

	getCookieAll():any {
		return this.cookie.getAll();
	}

	/** SET USER
	 * @Observations : Unico metodo para guardado de autocompletado de session.
	 * @param user : nombre de usuario
	 * @param pass : password de usuario
	 * @param check : 'true' or 'false' dependiendo de lo seleccionado por el usuario.
	 */ 
	setUserCookie( user: string, pass: string, check: string ):void {
		this.cookie.set('user', user);
		this.cookie.set('pass', pass);
		this.cookie.set('isCheck', check);
	}

	delUserCookie():void{
		this.deleteCookie('user');
		this.deleteCookie('pass');
		this.cookie.set('isCheck', 'false');
	}

}
