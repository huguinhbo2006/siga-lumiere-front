import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TiposEscuelasService } from '../../servicios/tipos-escuelas.service';

@Component({
  selector: 'app-tipos-escuelas',
  templateUrl: './tipos-escuelas.component.html',
  styleUrl: './tipos-escuelas.component.css'
})
export class TiposEscuelasComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: TiposEscuelasService){}
  
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
  
  mostrar(){
    this.
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.
      this.datos = respuesta;
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.
        this.generales.mensajeCorrecto('Tipo de escuela agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.
        this.generales.mensajeCorrecto('Tipo de escuela modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){
    this.
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Tipo de escuela activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Tipo de escuela desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Tipo de escuela eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
