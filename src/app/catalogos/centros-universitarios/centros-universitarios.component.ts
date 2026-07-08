import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CentrosUniversitariosService } from '../../servicios/centros-universitarios.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-centros-universitarios',
  templateUrl: './centros-universitarios.component.html',
  styleUrl: './centros-universitarios.component.css'
})
export class CentrosUniversitariosComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Siglas'],
    encabezados: ['nombre', 'siglas'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  busqueda: any;
  lista: any;
  listado: any;
  
  constructor(private generales: GeneralesService, private servicio: CentrosUniversitariosService){}
  
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
    this.datos = this.generales.sublista(this.listado, this.busqueda, 'idUniversidad');
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
        this.generales.mensajeCorrecto('Centro universitario agregado correctamente');
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
        this.generales.mensajeCorrecto('Centro universitario modificado correctamente');
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
      this.generales.mensajeCorrecto('Centro universitario activado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Centro universitario desactivado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Centro universitario eliminado correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar()
    });
  }
   
}