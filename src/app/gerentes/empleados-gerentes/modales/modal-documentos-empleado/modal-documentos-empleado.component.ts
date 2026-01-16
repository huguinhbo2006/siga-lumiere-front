import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-documentos-empleado',
  templateUrl: './modal-documentos-empleado.component.html',
  styleUrl: './modal-documentos-empleado.component.css'
})
export class ModalDocumentosEmpleadoComponent {
  @Input() dato = {
    actaNacimiento: '',
    comprobanteDomicilio: '',
    curp: '',
    ifef: '',
    ifet: '',
    rfc: '',
    carta1: '',
    carta2: '',
    nss: '',
    comporbanteEstudios: ''
  };
  @Output() emitidor = new EventEmitter();

  constructor(){}

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
