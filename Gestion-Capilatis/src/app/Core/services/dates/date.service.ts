import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
    
})
export class DateService {

   public date: Date;
   public url: string;
   
    constructor (
    ){
       this.date = new Date();
    }
    
    
    /** SET DATE
     * @observations devuelve un string con la fecha deseada
     * @formato yyyy-mm-dd
     * @param yyyy anio
     * @param mm mes
     * @param dd dia
     */
    setDate(yyyy:number , mm:number , dd:number){
        return (yyyy + "-" + mm + "-" + dd );
    }

    /** UPDATE DATE
     *  @observations retorna la fecha del dia actual en  string
     *  @formato 2018-08-23T23:27:29.390Z
     */
    updateDate(){
        return  this.date.toISOString();
    }

    /** FORMATO ISO
     * @observations retorna un string en formato USO 8601
     * @formato 2018-08-23T23:27:29.390Z
     * @param date fecha a devolver en formato STRING
     */
    formatISO( date : Date){
        return  date.toISOString();
    }

    /** FORMATO PRESENTASION
     * @observations retorna un string con la fecha en formato presentacion
     * @formato Fri Aug 24 2018
     * @param date fecha a formatear en string
     */
    formatPresentation( date: Date ){
        return date.toDateString()
    }



}