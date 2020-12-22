import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioModel {
	
	public usuario : any=[];
	constructor(){
	}

	setCurrentSession ( data : any ):any {
		 this.usuario.push(
			 {  'user' : [{
				'id' : data.user[0].id,
				'usuario' : data.user[0].usuario,
				'nombre' : data.user[0].nombre,
				'apellido' : data.user[0].nombre,
				'correo' : data.user[0].correo,
				'img' : data.user[0].imagen
			}],
			'token' : data.token
		});
	}

	getSession(): any { return ( this.usuario.length > 0 ) ? this.usuario[0] : null;}
	getToken():string { return this.usuario[0].token; }
	getID():string { return this.usuario[0].user[0].id; }
	getUsuario():string { return this.usuario[0].user[0].usuario; }
	getNombre():string { return this.usuario[0].user[0].nombre; }
	getCorreo():string { return this.usuario[0].user[0].correo; }
	getImg():string { return this.usuario[0].user[0].img; }

	setToken( token: string ){ this.usuario.token = token; }
	setID( id: string ){ this.usuario[0].id = id; }
	setUsuario( usuario: string ) { this.usuario[0].usuario = usuario; }
	setNombre( nombre: string ) { this.usuario[0].nombre = nombre; }
	setCorreo( correo: string ) { this.usuario[0].correo = correo; }
	setImg( img: string ) { this.usuario[0].img = img; }
}
