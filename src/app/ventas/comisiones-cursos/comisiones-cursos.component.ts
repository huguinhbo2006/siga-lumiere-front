import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ComisionesService } from '../../servicios/comisiones.service';

@Component({
  selector: 'app-comisiones-cursos',
  templateUrl: './comisiones-cursos.component.html',
  styleUrl: './comisiones-cursos.component.css'
})
export class ComisionesCursosComponent {
  configuracion: datatableConfig = {
    alias: ['Curso', 'Calendario', 'Comision'],
    encabezados: ['curso', 'calendario', 'total'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda: any;
  listas = {
    calendarios: [],
    cursos: []
  };
  listado: any;
  
  constructor(private generales: GeneralesService, private servicio: ComisionesService){}
  
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
    this.datos = this.generales.sublista(this.listado, this.busqueda, 'idCalendario');
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.traer().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listado = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Comision agregada correctamente');
        this.listado = this.generales.agregarDatoArray(this.listado, respuesta);
        this.generales.cerrarModal();
        this.buscar()
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Comision modificado correctamente');
        this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
        this.generales.cerrarModal();
        this.seleccion = respuesta;
        this.buscar()
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  eliminar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Comision eliminado correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar()
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
