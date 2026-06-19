import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { AplicacionSeccionesService } from '../../servicios/aplicacion-secciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css'
})
export class SeccionesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(
    private generales: GeneralesService,
    private servicio: AplicacionSeccionesService,
    private router: Router
  ){}
  
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
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  ir(){
    this.router.navigate(['admin/temas', this.seleccion.id, this.seleccion.nombre]);
  }
}
