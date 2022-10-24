import { NgModule } from '@angular/core'; /**Listo  */
import { CommonModule } from '@angular/common'; /**Listo  */
import { IonicModule } from '@ionic/angular'; /**Listo  */
import { ListarPageRoutingModule } from './listar-routing.module'; /**Listo  */
import { ListarPage } from './listar.page'; /**Listo  */
import { ProductoService } from '../servicio/producto.service'; /**Listo  */
import { HttpClientModule } from '@angular/common/http'; /**Listo  */

@NgModule({
  imports: [
    CommonModule, /**Listo  */
    IonicModule, /**Listo  */
    ListarPageRoutingModule, /**Listo  */
    HttpClientModule /**Listo  */
  ],
  declarations: [ListarPage],
  providers: [
    ProductoService
  ]
})
export class ListarPageModule {}
