import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../../Core/services/login/login.service';
import { LoginModel } from '../../Core/models/login/login.model';
import { StorageService } from '../../Core/services/storage/storage.service';
import { Router } from '@angular/router';
import { CookieServiceApp } from '../../Core/services/Cookies/Cookies';
import { UsuarioModel } from '../../Core/models/usuario/usuario.model';
//import { Md5 } from 'ts-md5/dist/md5';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [ LoginService, StorageService ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  public modelLogin : LoginModel;
	public errorLogin : boolean = false;
  public messageError : String = '';
  public vUser : UsuarioModel;

	@ViewChild('checkRecordar') check: any;

  constructor(
    private _loginService : LoginService,
    private storage: StorageService,
		private navegacion: Router,
		private cookie: CookieServiceApp,
		//private md5: Md5
  ) {
    this.modelLogin = new LoginModel('','');
    this.vUser = new UsuarioModel;
   }

  ngOnInit(): void {
  }

	ngAfterViewInit(){
		if( this.cookie.getCookie('isCheck') == 'true' ){
			this.modelLogin.user = this.cookie.getCookie('user');
			this.modelLogin.pass = this.cookie.getCookie('pass');
			this.check.nativeElement.checked = true;
		}else{
			this.modelLogin.user = '';
			this.modelLogin.pass = '';
			this.check.nativeElement.checked = false;
		}	
	}


  loginPrueba ( form: any ) {
    let pass = this.modelLogin.pass;
    this._loginService.setLogin( this.modelLogin, 'login' ).subscribe(
        response => {
          if ( response.error == ''){
						
						if(this.check.nativeElement.checked){
              this.cookie.setUserCookie(response.Resulset.user[0].usuario, pass , 'true');
						}else{
							this.cookie.delUserCookie();
						}        

            this.vUser.setCurrentSession(response.Resulset);
            this.storage.setCurrentSession( this.vUser.getSession() );
         		this.navegacion.navigate(['home']);
          }else {
						this.errorLogin = true;
						this.messageError = response.error;
          }
        },
        error => {
          this.errorLogin = true;
					this.messageError = error;
        }      
      );

			form.reset();
    }

}
