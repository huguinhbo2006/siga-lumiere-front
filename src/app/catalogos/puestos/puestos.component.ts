import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PuestosService } from '../../servicios/puestos.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrl: './puestos.component.css'
})
export class PuestosComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  busqueda: any;
  lista: any;
  listado: any;
  
  constructor(private generales: GeneralesService, private servicio: PuestosService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  buscar(){
    this.datos = this.generales.sublista(this.listado, this.busqueda, 'idDepartamento');
  }
  
  mostrar(){
    this.
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.
      this.listado = respuesta.datos;
      this.lista = respuesta.lista;
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.
        this.generales.mensajeCorrecto('Puesto agregado correctamente');
        this.listado = this.generales.agregarDatoArray(this.listado, respuesta);
        this.generales.cerrarModal();
        this.buscar()
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.
        this.generales.mensajeCorrecto('Puesto modificado correctamente');
        this.listado = this.generales.agregarDatoArray(this.listado, respuesta);
        this.generales.cerrarModal();
        this.seleccion = respuesta;
        this.buscar()
      });
    }
  }
  
  activar(){
    this.
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Puesto activado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Puesto desactivado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Puesto eliminado correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar()
    });
  }
  
}
