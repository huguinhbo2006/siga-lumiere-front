import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasIngresosService } from '../../servicios/metas-ingresos.service';

@Component({
  selector: 'app-metas-ingresos-ventas',
  templateUrl: './metas-ingresos-ventas.component.html',
  styleUrl: './metas-ingresos-ventas.component.css'
})
export class MetasIngresosVentasComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Sucursal', 'Meta', 'Mes'],
    encabezados: ['calendario', 'sucursal', 'meta', 'mes'],
    busqueda: true
  };
  datos: any;
  registros: any;
  listas = {
    calendarios: [],
    sucursales: []
  }
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda = {
    idCalendario: 0,
    idSucursal: 0
  }
  
  constructor(private generales: GeneralesService, private servicio: MetasIngresosService){}
  
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

  buscar(){
    this.datos = this.generales.sublistaMultiples(this.registros, this.busqueda)
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Meta de ingreso agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
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
        this.generales.mensajeCorrecto('Meta de ingreso modificado correctamente');
        this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
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
      this.generales.mensajeCorrecto('Meta de ingreso eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
