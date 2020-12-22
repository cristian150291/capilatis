import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//IMPORT PARA ANIMACIONES
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//IMPORT PARA PODER REALIZAR PETICIONES AJAX ( CLIENTE HTTP)
import { HttpClientModule } from "@angular/common/http";

//MODULE PAGES
import { PagesModule } from './Pages/pages.module';



@NgModule({
  declarations: [
    AppComponent
  //  MatAccordion
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
