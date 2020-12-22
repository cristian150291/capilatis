import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../Core/services/empleados/emp.service';
import { StorageService } from '../../Core/services/storage/storage.service';
import { UsuarioModel } from '../../Core/models/usuario/usuario.model';
import { NominaModel } from '../../Core/models/dbnomina/nomina.model';
import { FileService } from '../../Core/services/update-files/updateFiles.service'
import { DateService } from '../../Core/services/dates/date.service'
//Model

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

    public vUser : UsuarioModel;
    public modelNomina : NominaModel;
    public fileToUpload : File;

  constructor(
        private empservice : EmpService,
        public storage : StorageService,
        public _fileService : FileService,
        public _dateService : DateService,
  ) {
          this.vUser = new UsuarioModel();
          this.modelNomina = new NominaModel();
   }

    ngOnInit(): void {
    }

    newEmployee():void{
        if( this.storage.getCurrentSession != null ){
						let img = this.modelNomina.foto;
						this.modelNomina.foto = '';
						console.table( this.modelNomina );
            this.vUser.setCurrentSession( this.storage.getCurrentSession() );
            this.empservice.setEmployee( this.modelNomina ,'setemployee','NEW' , this.vUser.getToken() ).subscribe(
                response =>{
                    if(response.error == ''){
												this.modelNomina.foto = img;
                        this.saveFileImage( this.modelNomina );
                        this.modelNomina.fecha_update = this._dateService.updateDate();
                        this.modelNomina.fecha_carga = this._dateService.updateDate();
                        this.storage.updateToken( response.token);
                    }else{
                        console.log('Menssage User');
                    }
                },
                error =>{
									console.error('Error al realizar la peticion.');
                }
            );
        }else{
            console.error('Error no posee session.');
        }


    }

  /** EVENTO COMPONENTE HIJO
	* @Observations : evento click de hijo component, contenedor de data employee. Emit.
	*/ 
	eventEmployeeChild(modelnominachild: NominaModel ):void {
		this.modelNomina = modelnominachild;
		this.newEmployee();
	}


	/** CARGA FOTO EMPLOYEE.  
	* @Observations : Realiza la carga de la foto, si es que existe.
	*/ 
	saveFileImage( nomina : NominaModel ):void {
		if( nomina.foto ){
			let send = {
      	'img' : nomina.foto
			};

			this._fileService.makeFileRequest('uploadImg/'+nomina.id_legajo, send ,'image').then( ( result ) =>{
				console.log( result );
			});
		}
	}

}
