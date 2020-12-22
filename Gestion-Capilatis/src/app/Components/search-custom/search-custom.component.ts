import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { searchFilterModel } from '../../Core/models/searchFilter/searchFilter.model';


@Component({
  selector: 'app-search-custom',
  templateUrl: './search-custom.component.html',
  styleUrls: ['./search-custom.component.scss']
})
export class SearchCustomComponent implements OnInit {

  @Output() search = new EventEmitter<any>();
	@ViewChild('nameReferenceInputFecha') namereference : any;
	
	public searchModel : searchFilterModel;

	constructor() { 
		this.searchModel = new searchFilterModel('','');
	}

  ngOnInit(): void {
  }

	/** EVENT EMIT CLICK
	 * @obsersations envio los datos
	*/ 
  searchEvent(){
    this.search.emit( this.buildSendModel );
  }

	/** BUILD DATA SEND 
	 * @Obsertaions construimos un objeto que incluye los inputs y date
	 * 		
	*/ 
	buildSendModel():any{
		let data = {
			'inputs' : this.searchModel,
			'date' : this.namereference
		};

		return data;
	}
}
