import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { NominaModel } from '../../Core/models/dbnomina/nomina.model';
import { HelpService } from '../../Core/services/help/help.service';
import { Global } from '../../Core/Global';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
	providers : [ HelpService ]
})
export class EmployeeDataComponent implements OnInit, OnChanges {

	public nominaModel : NominaModel;
	public selectsector : any;
	public selectosocial : any;
	public selectgruop :any;
	public fileToUpload : Array<File>;
	public fileToUploadCuil : Array<File>;
	public fileToUploadDorso : Array<File>;
	public fileToUploadFrente : Array<File>;
	public fileToUploadAfip : Array<File>;
	public img_foto : string = '';

	@Output() emitNomina = new EventEmitter<NominaModel>();
	@Input('dataModel') dataModel : NominaModel;

	constructor(
		public _helpservice : HelpService,
	) { 
		this.nominaModel = new NominaModel();
	}

  ngOnInit(): void {
		this.fieldSelectCall();
  }

	ngOnChanges( ):void {
		this.nominaModel = ( this.dataModel ) ? this.dataModel : new NominaModel();
		if( this.nominaModel.foto ){
			this.img_foto = `${Global.urlService}godownImg/${this.nominaModel.foto}/${this.nominaModel.id_legajo}`;
		}
		if( !( parseInt( this.nominaModel.id_sector ) > 0  ) ){
			this.nominaModel.id_sector = '-1';
		}
		if( !( parseInt( this.nominaModel.id_grupo ) > 0  ) ){
			this.nominaModel.id_grupo = '-1';
		}
		if( !( parseInt( this.nominaModel.id_o_social ) > 0  ) ){
			this.nominaModel.id_o_social = '-1';
		}
	}

	/** EVNT EMITER
	* @Observations : Emito la data de employee al padre, la logica de las acciones 
	* las manipula quien llama a componente employee-data.
	*/ 
	sendEmployee():void{
		this.setFile();
		this.emitNomina.emit( this.nominaModel );
	}


	/** CARGA SELECT
	* @Observations : carga desde la api tablas auxiliares para los select.
	*/ 
	async fieldSelectCall() {
		let sectores = await this._helpservice.fieldHelp( { action : 'sector'}, 'help' ).toPromise();
		let grupos = await this._helpservice.fieldHelp( { action : 'grupo'}, 'help' ).toPromise();
		let obraSocial = await this._helpservice.fieldHelp( { action : 'obrasocial'}, 'help' ).toPromise();

		this.selectsector = sectores.Resultset;
		this.selectgruop = grupos.Resultset;
		this.selectosocial = obraSocial.Resultset;
	}

	/** BUIL FOTO 
	* @Observations : Carga la foto seleccionada en cada cambio.
	* @param file : event input file.
	*/ 
	fileChangeEventFoto( fileInput : any ){
		this.fileToUpload = <Array<File>> fileInput.target.files;
		this.previsualizer( fileInput.target.files[0] );
	}

	/** EVENT FILE PAGE
	* @Observations : Evento change para carga de file.
	*/
	cuilChangeEvent( fileInput : any ){
		this.fileToUploadCuil = <Array<File>> fileInput.target.files;
	}

	afipChangeEvent( fileInput : any ){
		this.fileToUploadAfip = <Array<File>> fileInput.target.files;
	}

	dorsoChangeEvent( fileInput : any ){
		this.fileToUploadDorso = <Array<File>> fileInput.target.files;
	}

	frenteChangeEvent( fileInput : any ){
		this.fileToUploadFrente = <Array<File>> fileInput.target.files;
	}

	/** PREVISUALIZAR IMAGEN.
	* @Observations : Previsualiza la imgen seleccionada por el usuario,
	* renderiza la imagen en tiempo real.
	*/ 
	previsualizer( file : File ){
		let reader = new FileReader;
    reader.onload = (e: any) => {
        this.img_foto = e.target.result;
    };
    reader.readAsDataURL(file);
	}

	/** BUIL FILE
	* @Observations : Setea el modelo de datos con los files
	* si estos existen.
	*/ 
	setFile(){

		if( this.fileToUpload ){
			this.nominaModel.foto = this.fileToUpload;
		}else{
			this.nominaModel.foto = '';
		}

		if( this.fileToUploadCuil ){
			this.nominaModel.cert_cuil = this.fileToUploadCuil;
		}else{
			this.nominaModel.cert_cuil = '';
		}

		if( this.fileToUploadFrente ){
			this.nominaModel.foto_dni = this.fileToUploadFrente;
		}else{
			this.nominaModel.foto_dni = '';
		}

		if( this.fileToUploadDorso ){
			this.nominaModel.foto_dnidso = this.fileToUploadDorso;
		}else{
			this.nominaModel.foto_dnidso = '';
		}

		if( this.fileToUploadAfip ){
			this.nominaModel.alta_afip = this.fileToUploadAfip;
		}else{
			this.nominaModel.alta_afip = '';
		}

	}


}
