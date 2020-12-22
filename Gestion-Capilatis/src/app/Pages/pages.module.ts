import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from  './pages.routing';
import { ListUserComponent } from './list-user/list-user.component';
import { ComponentsModule } from '../Components/components.module';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { InactiveEmployeeComponent } from './inactive-employee/inactive-employee.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    ListUserComponent,
    EmpEditComponent,
    NewEmployeeComponent,
    InactiveEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
    ComponentsModule.forRoot(),
    ButtonModule,
    AccordionModule,
    CalendarModule,
    DropdownModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
          ngModule: PagesModule
        }
    }
}
