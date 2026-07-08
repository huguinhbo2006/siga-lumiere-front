import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CentrosUniversitariosService } from '../../servicios/centros-universitarios.service';
import { datatableConfig } from '../../interfaces/tables.interface';
import { UniversidadesService } from '../../servicios/universidades.service';
import { CarrerasService } from '../../servicios/carreras.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Puntaje', 'Aspirantes', 'Admitidos', 'Rechazados'],
    encabezados: ['nombre', 'puntaje', 'aspirantes', 'admitidos', 'rechazados'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  busqueda = {
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCalendario: 0
  };
  listas = {
    universidades: [],
    centrosUniversitarios: [],
    calendarios: []
  };
  listado: any;
  listaCentrosUniversitarios: any;
  excel: any;
  
  constructor(private generales: GeneralesService, private servicio: CarrerasService){}
  
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

  buscarCentrosUniversitarios(){
    this.busqueda.idCentroUniversitario = 0;
    this.listaCentrosUniversitarios = this.generales.sublista(this.listas.centrosUniversitarios, this.busqueda.idUniversidad, 'idUniversidad');
  }
  
  buscar(){
    if(!this.generales.validarEntero(this.busqueda.idUniversidad) && !this.generales.validarEntero(this.busqueda.idCentroUniversitario) && !this.generales.validarEntero(this.busqueda.idCalendario)){
      this.datos = this.generales.sublista(this.listado, this.busqueda.idUniversidad, 'idUniversidad');
      this.datos = this.generales.sublista(this.datos, this.busqueda.idCentroUniversitario, 'idCentroUniversitario');
      this.datos = this.generales.sublista(this.datos, this.busqueda.idCalendario, 'idCalendario');
    }
  }
  
  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.listado = respuesta.datos;
      this.listas = respuesta.listas;
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Carrera agregada correctamente');
        this.listado = this.generales.agregarDatoArray(this.listado, respuesta);
        this.generales.cerrarModal();
        this.buscar();
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Carrera modificada correctamente');
        this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
        this.seleccion = respuesta;
        this.generales.cerrarModal();
        this.buscar();
      });
    }
  }
  
  activar(){
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Carrera activada correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar();
    });
  }
  
  desactivar(){
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Carrera desactivada correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar();
    });
  }
  
  eliminar(){
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Carrera eliminada correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar();
    });
  }
  
  cargar(){
    this.servicio.cargar({archivo: this.excel}).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Excel cargado correctamente');
    });
  }
}