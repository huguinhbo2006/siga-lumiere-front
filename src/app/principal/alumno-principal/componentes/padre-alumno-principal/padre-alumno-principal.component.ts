import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-padre-alumno-principal',
  templateUrl: './padre-alumno-principal.component.html',
  styleUrl: './padre-alumno-principal.component.css'
})
export class PadreAlumnoPrincipalComponent {
  @Input() datos = {
    nombre: '',
    telefono: '',
    celular: '',
    modificar: false
  }
  @Output() emitidor = new EventEmitter();

  constructor(private generales: GeneralesService){}

  emitir(){
    this.emitidor.emit(this.datos);
  }
}
