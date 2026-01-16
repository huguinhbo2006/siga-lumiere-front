import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasCursosService } from '../../servicios/metas-cursos.service';

@Component({
  selector: 'app-metas-cursos-ventas',
  templateUrl: './metas-cursos-ventas.component.html',
  styleUrl: './metas-cursos-ventas.component.css'
})
export class MetasCursosVentasComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Nivel', 'Subnivel', 'Modalidad', 'Curso', 'Sucursal', 'Meta'],
    encabezados: ['calendario', 'nivel', 'subnivel', 'modalidad', 'curso', 'sucursal', 'meta'],
    busqueda: true
  };
  datos: any;
  registros: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idModalidad: 0,
    idCurso: 0,
    idSucursal: 0
  };
  listas = {
    altas: [],
    calendarios: [],
    niveles: [],
    subniveles: [],
    modalidades: [],
    cursos: [],
    sucursales: []
  }
  
  constructor(private generales: GeneralesService, private servicio: MetasCursosService){}
  
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
    this.datos = this.generales.sublistaMultiples(this.registros, this.busqueda);
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.registros = respuesta.datos;
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
        this.generales.mensajeCorrecto('Meta por curso agregado correctamente');
        this.registros = this.generales.agregarDatoArray(this.registros, respuesta);
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
        this.generales.mensajeCorrecto('Meta por curso modificado correctamente');
        this.registros = this.generales.actualizarDatoArray(this.registros, respuesta);
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
      this.generales.mensajeCorrecto('Meta por curso eliminado correctamente');
      this.registros = this.generales.eliminarDatoArray(this.registros, respuesta);
      this.seleccion = undefined;
      this.buscar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
