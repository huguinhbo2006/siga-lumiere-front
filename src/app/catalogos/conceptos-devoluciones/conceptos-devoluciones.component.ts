import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ConceptosDevolucionesService } from '../../servicios/conceptos-devoluciones.service';

@Component({
  selector: 'app-conceptos-devoluciones',
  templateUrl: './conceptos-devoluciones.component.html',
  styleUrl: './conceptos-devoluciones.component.css'
})
export class ConceptosDevolucionesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ConceptosDevolucionesService){}
  
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
        this.generales.mensajeCorrecto('Concepto de devolucion agregado correctamente');
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
        this.generales.mensajeCorrecto('Concepto de devolucion modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){
    this.
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de devolucion activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){
    this.
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de devolucion desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){
    this.
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.
      this.generales.mensajeCorrecto('Concepto de devolucion eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
