import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AplicacionQuizesService } from '../../servicios/aplicacion-quizes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.css'
})
export class QuizesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda: any;
  lista: any;
  listado: any;
  idSubtema = 0;
  nombreSubtema = '';
  constructor(
    private generales: GeneralesService,
    private servicio: AplicacionQuizesService,
    private rutaActiva: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.idSubtema = this.rutaActiva.snapshot.params['id'];
    this.nombreSubtema = this.rutaActiva.snapshot.params['nombre'];
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
    this.servicio.mostrar({id: this.idSubtema}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.lista = respuesta.lista;
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
        this.generales.mensajeCorrecto('Quiz agregado correctamente');
        this.generales.cerrarModal();
        this.mostrar();
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
        this.generales.mensajeCorrecto('Quiz modificado correctamente');
        this.generales.cerrarModal();
        this.seleccion = respuesta;
        this.mostrar();
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
      this.generales.mensajeCorrecto('Quiz activado correctamente');
      this.seleccion = respuesta;
      this.mostrar();
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
      this.generales.mensajeCorrecto('Quiz desactivado correctamente');
      this.seleccion = respuesta;
      this.mostrar();
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
      this.generales.mensajeCorrecto('Quiz eliminado correctamente');
      this.seleccion = undefined;
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
