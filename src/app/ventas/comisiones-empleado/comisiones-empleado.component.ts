import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ComisionesService } from '../../servicios/comisiones.service';

@Component({
  selector: 'app-comisiones-empleado',
  templateUrl: './comisiones-empleado.component.html',
  styleUrl: './comisiones-empleado.component.css'
})
export class ComisionesEmpleadoComponent {
  configuracion: datatableConfig = {
    alias: ['Fecha', 'Calendario', 'Nivel', 'Curso', 'Nombre', 'Apellidos', 'Costo Final', '%', 'Comision'],
    encabezados: ['fecha', 'calendario', 'nivel', 'curso', 'nombres', 'apellidos', 'final', 'porcentaje', 'comision'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  busqueda = {
    year: 0,
    mes: 0,
    idEmpleado: localStorage.getItem('identificador')
  };
  listas = {
    years: []
  }
  meses: any;
  total = '0';
  
  constructor(public generales: GeneralesService, private servicio: ComisionesService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
 
  buscar(){
    this.servicio.comisiones(this.busqueda).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.comisiones;
      this.total = respuesta.total;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
