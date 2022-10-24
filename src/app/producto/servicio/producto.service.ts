import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductoConID, ProductoParcial } from './../modelo/producto';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private URL_API = 'http://localhost:3000/productos';
  public paginaActual = 1;
  private comProducto = new BehaviorSubject<Array<ProductoConID>>([]);
  public listaProductos$ = this.comProducto.asObservable();
  constructor(
    private cliente: HttpClient
  ) { }
  public agregarNuevo(producto: Producto): Observable<any> {
    return this.cliente.post(this.URL_API, producto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  // listar los primeros 10 productos
  public obtenerPrimerod10Productos(){
    this.cliente.get<Array<ProductoConID>>(`${this.URL_API}?_page=1`)
    .subscribe(datos => {
      this.paginaActual = this.paginaActual + 1;
      // Para notificar a los elementos subcritos
      this.comProducto.next(datos);
    })
  }

  public obtener10Mas(){
    this.cliente.get<Array<ProductoConID>>(`${this.URL_API}?_page=${this.paginaActual}`)
    .subscribe(datos => {
      this.paginaActual = this.paginaActual + 1;
      // Juntar los array
      // [1,2,3]
      // [4,5,6]
      // [1,2,3].concat([4,5,6]) -> [1,2,3,4,5,6]
      const arrayActual = this.comProducto.getValue()
      const arrayActualizado = arrayActual.concat(datos);
      this.comProducto.next(arrayActualizado);
    })
  }

  public buscarPorID(id: number): Observable<ProductoConID | null> {
    return this.cliente.get<ProductoConID | null>(`${this.URL_API}/${id}`);
  }
  // Eliminar
  public eliminarPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_API}/${id}`);
  }
  // modificar
  public modificarPorID(id:number, producto: ProductoParcial): Observable<any> {
    //return this.cliente.put();
    // CLIENTE REST
    //return this.cliente.patch();
    return this.cliente.patch(`${this.URL_API}/${id}`, producto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }






}
