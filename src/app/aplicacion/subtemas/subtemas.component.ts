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
    listado: any;
    idTema = 0;
    nombreTema = '';
    constructor(
      private generales: GeneralesService,
      private servicio: AplicacionSubtemasService,
      private rutaActiva: ActivatedRoute,
      private router: Router
    ){}
    
    ngOnInit(): void {
      this.mostrar();
      this.idTema = this.rutaActiva.snapshot.params['id'];
      this.nombreTema = this.rutaActiva.snapshot.params['nombre'];
      this.buscar();
    }
  
    ir(){
      this.router.navigate(['admin/quizes', this.seleccion.idTema, this.seleccion.nombre]);
    }
    
    modal(vista: any){
      this.vista = '';
      this.generales.delay(500).then(fun => {
        this.vista = vista;
        this.generales.abrirModal();
      });
    }
    
    buscar(){
      this.datos = this.generales.sublista(this.listado, this.idTema, 'idTema');
    }
    
    mostrar(){
      this.cargando = true;
      this.servicio.mostrar().subscribe((respuesta: any) => {
        this.cargando = false;
        this.listado = respuesta;
        this.buscar();
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
          this.generales.mensajeCorrecto('Tema modificado correctamente');
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
    
    activar(){
      this.cargando = true;
      this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Tema activado correctamente');
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
        this.generales.mensajeCorrecto('Tema desactivado correctamente');
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
        this.generales.mensajeCorrecto('Tema eliminado correctamente');
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
