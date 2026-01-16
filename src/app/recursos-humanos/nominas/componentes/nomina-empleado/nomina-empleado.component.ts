import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-nomina-empleado',
  templateUrl: './nomina-empleado.component.html',
  styleUrl: './nomina-empleado.component.css'
})
export class NominaEmpleadoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idNivel: 0,
    idCalendario: 0,
    idDepartamento: 0,
    idPuesto: 0,
    idEmpleado: 0,
    quincena: '',
    inicio: '',
    fin: '',
    expedicion: '',
    observaciones: '',
    idBanco: 0
  };
  @Input() listas = {
    niveles: [],
    calendarios: [],
    departamentos: [],
    puestos: [],
    empleados: [],
    deducciones: [],
    percepciones: [],
    bancos: [],
    sucursales: [],
    formas: [],
    nominas: []
  }
  @Input() modificar = false;
  puestos: any;
  empleados: any;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }

  buscarPuestos(){
    this.puestos = this.generales.sublista(this.listas.puestos, this.dato.idDepartamento, 'idDepartamento');
  }

  buscarEmpleados(){
    this.empleados = this.generales.sublista(this.listas.empleados, this.dato.idDepartamento, 'idDepartamento');
    this.empleados = this.generales.sublista(this.empleados, this.dato.idPuesto, 'idPuesto');
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
