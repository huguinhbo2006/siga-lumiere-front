import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ReservacionAulasService } from '../../servicios/reservacion-aulas.service';

@Component({
  selector: 'app-control-horarios',
  templateUrl: './control-horarios.component.html',
  styleUrl: './control-horarios.component.css'
})
export class ControlHorariosComponent {
  configuracion: datatableConfig = {
    alias: ['Horario', 'Cupos', 'Cursos', 'Inscritos', 'Lugares'],
    encabezados: ['horario', 'cupo', 'profesores', 'inscritos', 'lugares'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  busqueda = {
    idCalendario: 0,
    idSucursal: 0,
    idParidad: 0
  }
  listas = {
    calendarios: [],
    sucursales: [],
    paridades: []
  }
  search = false;
  constructor(private generales: GeneralesService, private servicio: ReservacionAulasService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.listas().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  

  traer(){
    this.servicio.horarios(this.busqueda).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
