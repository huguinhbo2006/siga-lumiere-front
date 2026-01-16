import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-empleado-fiscales',
  templateUrl: './empleado-fiscales.component.html',
  styleUrl: './empleado-fiscales.component.css'
})
export class EmpleadoFiscalesComponent {
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  @Input() dato = {
    nss: '',
    rfc: '',
    curp: '',
    cuentaBancaria: '',
    fechaAltaImms: '',
    fechaIngreso: '',
    fechaBaja: ''
  };
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.siguiente.emit(this.dato);
  }
  
  cerrar() {
    this.anterior.emit(1);
  }
}
