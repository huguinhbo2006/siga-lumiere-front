import { Component, Input } from '@angular/core';
import { NominasService } from '../../../../servicios/nominas.service';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-empleado-nomina-principal',
  templateUrl: './empleado-nomina-principal.component.html',
  styleUrl: './empleado-nomina-principal.component.css'
})
export class EmpleadoNominaPrincipalComponent {
  dato = {
    idNivel: 0,
    idCalendario: 0,
    idDepartamento: 0,
    idPuesto: 0,
    idEmpleado: 0,
    quincena: '',
    fechaInicio: '',
    fechaFin: '',
    fechaExpedicion: '',
    observaciones: ''
  }
  listas = {
    niveles: [],
    calendarios: [],
    departamentos: [],
    puestos: [],
    empleados: []
  }
  @Input() nomina: any;
  cargando = false;
  constructor(private servicio: NominasService, private generales: GeneralesService){

  }

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.nomina({id: this.nomina}).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.dato = respuesta.dato;
      this.cargando = false
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  guardar(){
    this.cargando = true;
    this.servicio.modificar(this.dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Nomina modificada correctamente');
      this.dato = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
