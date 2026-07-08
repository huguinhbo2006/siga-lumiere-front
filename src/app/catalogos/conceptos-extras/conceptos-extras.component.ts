import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ConceptosExtrasService } from '../../servicios/conceptos-extras.service';

@Component({
  selector: 'app-conceptos-extras',
  templateUrl: './conceptos-extras.component.html',
  styleUrl: './conceptos-extras.component.css'
})
export class ConceptosExtrasComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ConceptosExtrasService){}
  
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
        this.generales.mensajeCorrecto('Concepto de extra agregado correctamente');
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
        this.generales.mensajeCorrecto('Concepto de extra modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){
    this.
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de extra activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de extra desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de extra eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
