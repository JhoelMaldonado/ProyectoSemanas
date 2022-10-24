import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../servicio/producto.service';
// Servicio , Clase, Clase, Funciones de validacion sync
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  public colors: Array<string> = [
    'azul',
    'rojo',
    'verde',
    'amarillo',
    'negro',
    'blanco',
    'Plomo'
  ];
  public marcas: Array<string> = [
    'xiaomi',
    'samsung',
    'motorola',
    'huawei',
    'realme'
  ];

  public hechoEns: Array<string> = [
    'China',
    'Japon',
    'USA',
    'SurCorea'
  ];
  public precios: Array<string> = [
    '$89990',
    '$99990',
    '$109990',
    '$139990'
  ];
  public imagenBase = '';
  public formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      foto: ['', Validators.required],
      stock: [20, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000)
      ]],
      altura: [20, [
        Validators.required,
        Validators.min(20),
        Validators.max(100)
      ]],
      peso: [150, [
        Validators.required,
        Validators.min(150),
        Validators.max(400)
      ]],
      descripcion: ['',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]],
      color: ['azul', Validators.required],
      marca: ['xiaomi', Validators.required],
      hechoEn: ['China', Validators.required],
      precio: ['$89990', Validators.required],

    });
  }

  public campo(control: string){
    return this.formulario.get(control);
  }
  public errores(control: string){
    return this.campo(control).errors
  }
  public esTocado(control: string){
    return this.campo(control).touched;
  }
  public estaSucio(control: string){
    return this.campo(control).dirty;
  }
  public guardarProducto(){
    if(this.formulario.invalid ){
      this.formulario.markAllAsTouched();
      return;
    }
    this.productoServicio.agregarNuevo({
      ...this.formulario.value,
      foto: this.imagenBase
    })
    .subscribe(dato => {
      if(dato){
        alert("Guardado correctamente");
        this.formulario.reset();
        this.formulario.updateValueAndValidity();
        this.router.navigate(['']);
      }
    })
  }
  public cambiarFoto(e: Event){
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      // BASE 64
      // console.log(reader.result);
      this.imagenBase = reader.result as string;
    }
  }

  ngOnInit() {
  }
}
