import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasMesService } from '../../servicios/metas-mes.service';

@Component({
  selector: 'app-metas-mes-ventas',
  templateUrl: './metas-mes-ventas.component.html',
  styleUrl: './metas-mes-ventas.component.css'
})
export class MetasMesVentasComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Nivel', 'Subnivel', 'Sucursal', 'Mes', 'Meta'],
    encabezados: ['calendario', 'nivel', 'subnivel', 'sucursal', 'mes', 'meta'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idSucursal: 0,
    mes: 0
  };
  listas = {
    calendarios: [],
    niveles: [],
    subniveles: [],
    sucursales: []
  };
  registros: any;
  
  constructor(public generales: GeneralesService, private servicio: MetasMesService){}
  
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
        this.generales.mensajeCorrecto('Meta por mes agregado correctamente');
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
        this.generales.mensajeCorrecto('Meta por mes modificado correctamente');
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
      this.generales.mensajeCorrecto('Meta por mes eliminado correctamente');
      this.registros = this.generales.eliminarDatoArray(this.registros, respuesta);
      this.seleccion = undefined;
      this.buscar()
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
