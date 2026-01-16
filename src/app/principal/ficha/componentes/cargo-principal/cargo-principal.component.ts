import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cargo-principal',
  templateUrl: './cargo-principal.component.html',
  styleUrl: './cargo-principal.component.css'
})
export class CargoPrincipalComponent {
  dato = {
    id: 0,
    idConcepto: 0,
    monto: '',
    concepto: ''
  }
  @Input() lista: any;
  @Output() emitidor = new EventEmitter();
  constructor(){}

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
