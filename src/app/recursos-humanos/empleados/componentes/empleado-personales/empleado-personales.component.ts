import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-empleado-personales',
  templateUrl: './empleado-personales.component.html',
  styleUrl: './empleado-personales.component.css'
})
export class EmpleadoPersonalesComponent {
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    estadoCivil: '',
    fechaNacimiento: '',
    telefono: '',
    celular: '',
    correo: ''
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
