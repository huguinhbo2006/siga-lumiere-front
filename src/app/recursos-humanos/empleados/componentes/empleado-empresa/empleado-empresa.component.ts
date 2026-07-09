import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-empleado-empresa',
  templateUrl: './empleado-empresa.component.html',
  styleUrl: './empleado-empresa.component.css'
})
export class EmpleadoEmpresaComponent {
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  @Input() dato: any;
  @Input() modificar = false;
  @Input() listas = {
    sucursales: [],
    departamentos: [],
    puestos: []
  }
  puestos: any;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    (this.modificar) ? this.buscarPuestos() : null;
  }

  buscarPuestos(){
    this.dato.idPuesto = (this.modificar) ? this.dato.idPuesto : 0;
    this.puestos = this.generales.sublista(this.listas.puestos, this.dato.idDepartamento, 'idDepartamento');
  }
  
  emitir() {
    this.siguiente.emit(this.dato);
  }
  
  cerrar() {
    this.anterior.emit(1);
  }
}
