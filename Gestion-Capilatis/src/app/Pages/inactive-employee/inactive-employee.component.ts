import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginador } from '../../Core/Custom/paginador';

@Component({
  selector: 'app-inactive-employee',
  templateUrl: './inactive-employee.component.html',
  styleUrls: ['./inactive-employee.component.scss'],
  providers: [ Paginador ]
})
export class InactiveEmployeeComponent implements OnInit {

    public headersList = ['Legajo','Nombre','Cuil'];
	  public tabla : any = {};
	  public optionsTable = { 'edit' : false , 'delete' : false };

  constructor(
        private navegacion : Router,
		    private paginador : Paginador,
  ) {
        this.pagesEnvet().nextPages('1');
    }

  ngOnInit(): void {
  }

    verEmpleado( legajo: string ){
      this.navegacion.navigate(['home/editempleado/'+legajo]);
    }

    pagesEnvet () {
      return {
        nextPages : (pag : any) => {
          this.paginador.changePage(pag,'next','listUser', (data: any) => {
            this.builGridData(data.Resulset, this.headersList, this.optionsTable, data.actual, data.cantTuplas, data.pag );
          });
        },
        backPages : (pag : any) => {
          this.paginador.changePage(pag,'back','listUser', (data: any) => {
            this.builGridData(data.Resulset, this.headersList , this.optionsTable, data.actual, data.cantTuplas, data.pag );
          });
        }
      }
    }

    builGridData( data : any, headers = null, options = null, paginaActual = null , cantidadTuplas = null, totalPaginas = null){
      this.tabla = {
        'list' : data,
        'cabeceraList' : headers,
        'opciones' : options,
        'paginaActual' : paginaActual,
        'cantidadPaginas' : cantidadTuplas,
        'totalPaginas' : totalPaginas
      }
    }

    nextPages(pagina: number ){
      this.pagesEnvet().nextPages(pagina);
    }

    backPages(pagina: number ){
      this.pagesEnvet().backPages(pagina);
    }


}
