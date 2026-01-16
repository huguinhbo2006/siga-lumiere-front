import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-devolucion-principal',
  templateUrl: './devolucion-principal.component.html',
  styleUrl: './devolucion-principal.component.css'
})
export class DevolucionPrincipalComponent {
  @Input() lista: any;
  @Input() formas: any;
  @Input() bancos: any;
  @Input() dato = {
    idConcepto: 0,
    idFormaPago: 0,
    monto: '',
    idBanco: 0,
  }
  @Output() emitidor = new EventEmitter();
  
  constructor(){}

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
