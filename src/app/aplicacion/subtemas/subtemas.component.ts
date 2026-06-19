import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AplicaionTemasService } from '../../servicios/aplicaion-temas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacionSubtemasService } from '../../servicios/aplicacion-subtemas.service';

@Component({
  selector: 'app-subtemas',
  templateUrl: './subtemas.component.html',
  styleUrl: './subtemas.component.css'
})
export class SubtemasComponent {
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
  idTema = 0;
  nombreTema = '';
  constructor(
    private generales: GeneralesService,
    private servicio: AplicacionSubtemasService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.idTema = this.rutaActiva.snapshot.params['id'];
    this.nombreTema = this.rutaActiva.snapshot.params['nombre'];
    this.mostrar();
  }

  ir(){
    this.router.navigate(['admin/quizes', this.seleccion.id, this.seleccion.nombre]);
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
    this.servicio.mostrar({id: this.idTema}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
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
        this.generales.mensajeCorrecto('Tema agregado correctamente');
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
        this.generales.mensajeCorrecto('Tema modificado correctamente');
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
      this.generales.mensajeCorrecto('Tema activado correctamente');
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
      this.generales.mensajeCorrecto('Tema desactivado correctamente');
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
      this.generales.mensajeCorrecto('Tema eliminado correctamente');
      this.seleccion = undefined;
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
