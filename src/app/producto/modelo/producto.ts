export interface Producto {
  nombre: string;
  foto: string;
  stock: number;
  altura: number;
  peso: number;
  descripcion: string;
  color: string;
  marca: string;
  hechoEn: string;
  precio: string;
}

export interface ProductoConID extends Producto {
  id: number;
}

export interface ProductoParcial extends Partial<Producto>{

}
