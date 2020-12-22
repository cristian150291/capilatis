import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../Core/services/empleados/emp.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../Core/services/storage/storage.service';
import { UsuarioModel }  from '../../Core/models/usuario/usuario.model';
import { NominaModel } from '../../Core/models/dbnomina/nomina.model'
import { FileService } from '../../Core/services/update-files/updateFiles.service';
import { DateService } from '../../Core/services/dates/date.service';




@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss'],
	providers : [ EmpService, StorageService, FileService ]
})
export class EmpEditComponent implements OnInit {

	private legajo: string = '';
	public dataEmp : any;
	public  vUser : UsuarioModel;
	public modelNomina : NominaModel;
	public fileToUpload:File;


  constructor(
		private empservice : EmpService,
		private _fileservice : FileService,
		private activateRoute : ActivatedRoute,
		public storage : StorageService,
		public _dateService : DateService,
  ) {
			this.vUser = new UsuarioModel();
			this.legajo = this.activateRoute.snapshot.params.legajo;
			this.modelNomina = new NominaModel();
			this.editaremp(this.legajo);
   }
  
  ngOnInit(): void {
  }

	/** BUILD DATA EMPLOYEE **/
	editaremp ( legajo : any ): void{
		if( this.storage.getCurrentSession() != null ){

			this.vUser.setCurrentSession( this.storage.getCurrentSession() );
			this.empservice.editemp({ 'legajo' : legajo, 'token' : this.vUser.getToken() }, 'getempleado').subscribe(
				response =>{
					if(response.error == ''){
						this.modelNomina = response.Resulset[0];
						this.storage.updateToken( response.token );

					}else{
						console.log('Menssage user : '+ response.error);
					}
				},
				error => {
					console.error(`emp-edit.component.ts : ${error}`);
				}
			);
		}else{
			console.log('Tenemos un problema, llego hasta aca sin sesion');
		}

	}


	saveRecordEmployee():void{
		if(	this.storage.getCurrentSession() != null ){
			
			this.vUser.setCurrentSession( this.storage.getCurrentSession() );
			this.empservice.setEmployee( this.modelNomina,'setemployee' ,'UPDATE', this.vUser.getToken() ).subscribe(
				response =>{
					if(response.error == ''){
						// carga de imagen //
						this.saveFile( this.modelNomina );
						this.modelNomina.fecha_update = this._dateService.updateDate();
						this.storage.updateToken( response.token );
					}else{
						console.log('Menssage User');
					}
				},
				error => {
					console.error('emp-edit.component.ts : '+error);
				}
			);		
		}else{
			console.log('Tenemos un problema, llego hasta aca sin sesion')
		}
		
	}


	/** EVENTO COMPONENTE HIJO
	* @Observations : evento click de hijo component, contenedor de data employee. Emit.
	*/ 
	eventEmployeeChild(modelnominachild: NominaModel ):void {
		this.modelNomina = modelnominachild;
		this.saveRecordEmployee();
	}

	/** CARGA FOTO EMPLOYEE.  
	* @Observations : Realiza la carga de la foto, si es que existe.
	*/ 
	saveFile( nomina : NominaModel ) {

		if( nomina.foto ){
			let send = {
      	'file' : nomina.foto
			};

			this._fileservice.makeFileRequest('uploadImg/'+nomina.id_legajo, send ,'image').then( ( result ) =>{});
		}

		if( nomina.cert_cuil ){
			let send = {
				'file' : nomina.cert_cuil
			};
			
			this._fileservice.makeFileRequest(`uploadFile/${nomina.id_legajo}`, send, 'files').then( ( result ) =>{});
		
		}

		if( nomina.foto_dni ){
			let send = {
				'file' : nomina.foto_dni
			};

			this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}`, send, 'files' ).then( result =>{  });
		}

		if( nomina.foto_dnidso ){
			let send = {
				'file' : nomina.foto_dnidso
			};

			this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}`, send, 'files' ).then( result =>{  });
		}

		if( nomina.alta_afip ){
			let send = {
				'file' : nomina.alta_afip
			};

			this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}`, send, 'files' ).then( result =>{  });
		}

	}
	

}


