import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductoConID } from '../modelo/producto';
import { ProductoService } from './../servicio/producto.service';
@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  public idActiva = '';
  public productoActivo!: ProductoConID;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ProductoService
  ) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe(parametros => {
      this.idActiva = parametros.idProducto;
      this.apiProducto.buscarPorID(+this.idActiva)
      .subscribe(producto => {
        if(producto){
          this.productoActivo = producto;
        }else {
          this.router.navigate(['']);
        }
      })
    });
  }

  public borrar(){
    this.apiProducto.eliminarPorID(+this.idActiva)
    .subscribe(dato => {
      if(dato){
        alert('Borrado :D');
        this.router.navigate(['']);
      }
    })
  }

}
