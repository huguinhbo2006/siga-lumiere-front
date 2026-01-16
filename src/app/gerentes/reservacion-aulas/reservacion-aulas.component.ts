import { Component } from '@angular/core';
import { ReservacionAulasService } from '../../servicios/reservacion-aulas.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-reservacion-aulas',
  templateUrl: './reservacion-aulas.component.html',
  styleUrl: './reservacion-aulas.component.css'
})
export class ReservacionAulasComponent {
  configuracion: datatableConfig = {
    alias: ['Curso', 'Nivel', 'Subnivel', 'Modalidad', 'Categoria', 'Sede', 'Fecha Inicio', 'Fecha Fin', 'Aulas Reservadas', 'Profesores Reservados'],
    encabezados: ['curso', 'nivel', 'subnivel', 'modalidad', 'categoria', 'sede', 'inicio', 'fin', 'aulas', 'profesores'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas = {
    aulas: [],
    profesores: []
  }
  
  constructor(private generales: GeneralesService, private servicio: ReservacionAulasService){}
  
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
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
