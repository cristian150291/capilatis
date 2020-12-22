import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { GridEmpCustomComponent } from './grid-emp-custom/grid-emp-custom.component';
import { SearchCustomComponent } from './search-custom/search-custom.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
 		GridEmpCustomComponent,
 		SearchCustomComponent,
 		EmployeeDataComponent,
 		TitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
	exports : [
		GridEmpCustomComponent,
		EmployeeDataComponent,
		TitleComponent
	],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule { 
    static forRoot(): ModuleWithProviders<any> {
        return {
          ngModule: ComponentsModule
        }
    }
}
