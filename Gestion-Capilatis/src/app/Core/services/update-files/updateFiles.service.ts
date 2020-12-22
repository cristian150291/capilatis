import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../Global';


@Injectable({
    providedIn: 'root'
})

export class FileService {
    
    public Url:string;

    constructor (
        public _http:HttpClient
    ){
        this.Url = Global.urlService;
    }

    /** FILE REQUEST
   * @observations 
   * @param url url donde esta la imagen
   * @param files imagen
   * @param name nombre de la imagen
   */
  makeFileRequest( path : string, data : any , name : string){
		let files = <Array<File>> data.file;
    return new Promise(function(resolve, reject){

				let url = Global.urlService;

        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        for(var i= 0 ; i < files.length; i++){
            formData.append( name, files[i], files[i].name);
        }

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){                        //espera una respuesta
                if(xhr.status == 200){                      //si la respuesta es positiva
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response)
                }
            }
        }

        xhr.open('POST',url+path,true);
        xhr.send(formData);

   })
}




}
