import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-emp-custom',
  templateUrl: './grid-emp-custom.component.html',
  styleUrls: ['./grid-emp-custom.component.scss']
})
export class GridEmpCustomComponent implements OnInit, OnChanges {

	@Input('list') listTable: any;
	@Output() fieldEvent = new EventEmitter<any>();
	@Output() fieldDeleteEvent = new EventEmitter<any>();
	@Output() next = new EventEmitter<number>();
	@Output() back = new EventEmitter<number>();

	public tabla : any;
	public cabecera : any;
	public opcionesGrid : any;
	public paginaActual : string;

  constructor() { }

  ngOnInit(): void {
  }

	ngOnChanges ( changes: SimpleChanges ):void {
		if ( !changes.listTable.firstChange ) {
			this.tabla = this.listTable.list;
			this.cabecera = this.listTable.cabeceraList;
			this.opcionesGrid = this.listTable.opciones;
			this.paginaActual = this.listTable.paginaActual;
		}
	}

	eventEditField (id: string):void{
		this.fieldEvent.emit(id);
	}

	eventDeleteField (id: string):void{
		this.fieldDeleteEvent.emit(id);
	}
	
	nextPages(){
		this.next.emit( parseInt(this.paginaActual) + 1);
	}

	backPages(){
		this.back.emit( parseInt(this.paginaActual) - 1);
	}

}
