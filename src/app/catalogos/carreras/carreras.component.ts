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
  cargando = false;
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
    console.log(this.busqueda);
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
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
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
    console.log(dato);
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto(' agregado correctamente');
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
    console.log(dato);
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto(' modificado correctamente');
        this.listado = this.generales.agregarDatoArray(this.listado, respuesta);
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
  
  activar(){
    this.cargando = true;
    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto(' activado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  desactivar(){
    this.cargando = true;
    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto(' desactivado correctamente');
      this.listado = this.generales.actualizarDatoArray(this.listado, respuesta);
      this.seleccion = respuesta;
      this.buscar()
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  eliminar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto(' eliminado correctamente');
      this.listado = this.generales.eliminarDatoArray(this.listado, respuesta);
      this.seleccion = undefined;
      this.buscar()
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  cargar(){
    this.cargando = true;
    this.servicio.cargar({archivo: this.excel}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Excel cargado correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
