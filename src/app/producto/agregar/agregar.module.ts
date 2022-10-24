import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPageRoutingModule } from './agregar-routing.module';

import { AgregarPage } from './agregar.page';
import { ProductoService } from '../servicio/producto.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ // <- todo lo que es modulo
    CommonModule,
    IonicModule,
    AgregarPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AgregarPage], // <- todo lo que es componnte
  providers: [
    ProductoService
  ] // Aquì va los servicios, pipes y otras directivas
})
export class AgregarPageModule {}

