import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoConID } from '../modelo/producto';
import { ProductoService } from '../servicio/Producto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  public productos: Array<ProductoConID> = [];
  constructor(
    private apiProducto: ProductoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.apiProducto.obtenerPrimerod10Productos();
    this.apiProducto.listaProductos$.subscribe(datos => {
      this.productos = datos;
    });
  }

}

