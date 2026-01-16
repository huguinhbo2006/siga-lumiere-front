import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tutor-datos',
  templateUrl: './tutor-datos.component.html',
  styleUrl: './tutor-datos.component.css'
})
export class TutorDatosComponent {
  @Input() datos = {
    nombre: '',
    celular: '',
    telefono: ''
  }
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  constructor(){}
  
  ngOnInit(){}

  emitirAnterior(){
    this.anterior.emit(true);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }
}
