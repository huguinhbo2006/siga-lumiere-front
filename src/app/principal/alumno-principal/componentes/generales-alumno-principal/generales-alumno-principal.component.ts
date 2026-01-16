import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-generales-alumno-principal',
  templateUrl: './generales-alumno-principal.component.html',
  styleUrl: './generales-alumno-principal.component.css'
})
export class GeneralesAlumnoPrincipalComponent {
  @Input() datos = {
    telefono: '',
    celular: '',
    correo: '',
    fechaNacimiento: '',
    modificar: false
  }
  @Output() emitidor = new EventEmitter();
  constructor(private generales: GeneralesService){}

  emitir(){
    this.emitidor.emit(this.datos);
  }
}
