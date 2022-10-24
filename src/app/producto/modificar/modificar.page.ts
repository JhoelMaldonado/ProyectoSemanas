import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductoService } from './../servicio/producto.service';
import { ProductoConID } from '../modelo/producto';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  public idActiva = 0;
  public ProductoActivo!: ProductoConID;
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
    private router: Router,
    private rutaActiva: ActivatedRoute
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
        Validators.maxLength(100)
      ]],
      color: ['azul', Validators.required],
      marca: ['xiaomi', Validators.required],
      hechoEn: ['Japon', Validators.required],
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
    this.productoServicio.modificarPorID(this.idActiva,{
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
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idProducto');
      this.productoServicio.buscarPorID(this.idActiva)
      .subscribe(producto => {
        if(producto){
          this.ProductoActivo = producto;
          this.imagenBase = producto.foto;
          this.formulario.setValue({
            ...this.ProductoActivo
          });
          this.formulario.updateValueAndValidity();
        }else{
          this.router.navigate(['']);
        }
      });
    })
  }

}

