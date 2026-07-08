import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TiposEgresosService } from '../../servicios/tipos-egresos.service';

@Component({
  selector: 'app-tipos-egresos',
  templateUrl: './tipos-egresos.component.html',
  styleUrl: './tipos-egresos.component.css'
})
export class TiposEgresosComponent {
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
  
  constructor(private generales: GeneralesService, private servicio: TiposEgresosService){}
  
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
    this.datos = this.generales.sublista(this.listado, this.busqueda, 'idRubro');
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
        this.generales.mensajeCorrecto('Tipo de egreso agregado correctamente');
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
        this.generales.mensajeCorrecto('Tipo de egreso modificado correctamente');
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
      this.generales.mensajeCorrecto('Tipo de egreso activado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Tipo de egreso desactivado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Tipo de egreso eliminado correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar()
    });
  }
  
}
