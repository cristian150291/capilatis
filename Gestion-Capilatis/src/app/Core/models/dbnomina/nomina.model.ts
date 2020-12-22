/** NOMINA MODELS
 * @observations : Modelo de estructura para empleados
 * 
 */

 export class NominaModel{
    public id_legajo:string;
    public nombre:string;
    public cuil:string;
    public fecha_ingreso:string;
    public fecha_nacimiento:string ; 
    public activo:boolean;
    public fecha_egreso:string;
    public categoria:string;
    public mail:string;
    public art:string;
    public poliza:string;
    public foto:any;
    public alta_afip:any;
    public foto_dni:any;
    public foto_dnidso:any;
    public cert_cuil:any;
    public calle:string;
    public numero:string;
    public piso:string;
    public localidad:string;
    public provincia:string;
    public codp:string;
    public telefono:string;
    public celular:string;
    public usuario_carga:string;
    public fecha_carga:string;
    public usuario_update:string;
    public fecha_update:string;
    public orden:string;
    public presentismo:boolean;
    public almuerzo:boolean;
    public t_almuerzo:string;
    public hsextra:boolean;
    public t_hsextra:string;
    public premio:boolean;
    public t_premio:string;
    public sector:string;
    public grupo:string;
    public o_social:string;
    public jefe:string;
    public osexcedente:boolean;
    public motivo:string;
    public observaciones:string;
    public plan:string;
    public vacaciones:string;
    public viaticos:string;
    public tcelular:string;
    public cursos:boolean;
    public convenio:string;
    public id_sector:string;
	 public id_grupo:string;
	 public id_o_social:string;


   constructor(){
      this.init();		
   }

   init(){
      this.id_legajo='';
      this.nombre='';
      this.cuil='';
      this.fecha_ingreso='';
      this.fecha_nacimiento='' ; 
      this.activo=false;
      this.fecha_egreso='';
      this.categoria='';
      this.mail='';
      this.art='';
      this.poliza='';
      this.foto='';
      this.alta_afip='';
      this.foto_dni='';
      this.foto_dnidso='';
      this.cert_cuil='';
      this.calle='';
      this.numero='';
      this.piso='';
      this.localidad='';
      this.provincia='';
      this.codp='';
      this.telefono='';
      this.celular='';
      this.usuario_carga='';
      this.fecha_carga='';
      this.usuario_update='';
      this.fecha_update='';
      this.orden='';
      this.presentismo=false;
      this.almuerzo=false;
      this.t_almuerzo='';
      this.hsextra=false;
      this.t_hsextra='';
      this.premio=false;
      this.t_premio='';
      this.sector='';
      this.grupo='';
      this.o_social='';
      this.jefe='';
      this.osexcedente=false;
      this.motivo='';
      this.observaciones='';
      this.plan='';
      this.vacaciones='';
      this.viaticos='';
      this.tcelular='';
      this.cursos=false;
      this.convenio='';
		this.id_sector='';
		this.id_grupo='';
		this.id_o_social='';
   }
 }
