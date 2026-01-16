import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-extra-principal',
  templateUrl: './extra-principal.component.html',
  styleUrl: './extra-principal.component.css'
})
export class ExtraPrincipalComponent {
  @Input() lista: any;
  @Input() dato = {
    monto: '',
    idConcepto: 0
  }
  @Output() emitidor = new EventEmitter();

  constructor(){}

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
