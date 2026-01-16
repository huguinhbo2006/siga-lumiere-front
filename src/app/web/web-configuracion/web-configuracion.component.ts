import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { WebService } from '../../servicios/web.service';
import { datatableConfig } from '../../interfaces/tables.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-web-configuracion',
  templateUrl: './web-configuracion.component.html',
  styleUrl: './web-configuracion.component.css'
})
export class WebConfiguracionComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  cargando = false;
  configuraciones: any;
  paginaSeleccionada : any;
  vista ='';
  listas = {
    componentes: [],
    paginas: []
  }
  configuracionSeleccionada: any;
  
  constructor(private generales: GeneralesService, private servicio: WebService){}
  
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
    this.servicio.paginas().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerConfiguracion(id: any){
    this.paginaSeleccionada = id;
    this.cargando = false;
    this.servicio.traerConfiguracionPagina({idPagina: id}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.configuraciones = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  guardarConfiguracion(){

  }

  guardarComponente(datos: any){
    datos.idPagina = this.paginaSeleccionada;
    this.cargando = true;
    this.servicio.nuevaConfiguracionPagina(datos).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Componente guardado correctamente');
      this.generales.cerrarModal();
      this.traerConfiguracion(this.paginaSeleccionada);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  eliminar(dato: any){
    dato.idPagina = this.paginaSeleccionada;
    this.cargando = true;
    this.servicio.eliminarConfiguracionPagina(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Configuracion eliminada correctamente');
      this.configuraciones = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  configurar(dato: any){
    this.configuracionSeleccionada = dato;
    if(dato.idComponente.toString() === '1'){
      this.modal('banner');
    }
    if(dato.idComponente.toString() === '2'){
      this.modal('titulo');
    }
    if(dato.idComponente.toString() === '4'){
      this.modal('video');
    }
    if(dato.idComponente.toString() === '7'){
      this.modal('cursos');
    }
  }

  drop(event: any) {
    moveItemInArray(this.configuraciones, event.previousIndex, event.currentIndex);
  }
}
