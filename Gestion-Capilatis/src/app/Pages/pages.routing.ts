import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CanActivateHomePage } from '../Guards/guardHome';
import { ListUserComponent } from './list-user/list-user.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component'
import { InactiveEmployeeComponent } from './inactive-employee/inactive-employee.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateHomePage] ,
    children:[
      { path:'listempleado',component: ListUserComponent },
      { path:'editempleado/:legajo',component : EmpEditComponent },
      { path:'newemployee',component : NewEmployeeComponent },
      { path:'inactiveemployee', component : InactiveEmployeeComponent},
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
