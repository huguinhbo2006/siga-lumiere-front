import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-prospecto',
  templateUrl: './modal-prospecto.component.html',
  styleUrl: './modal-prospecto.component.css'
})
export class ModalProspectoComponent {
  @Input() prospecto = {
    nombre: '',
    celular: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    promedio: '',
    linkFacebook: '',
    linkInstagram: '',
    idUsuario: localStorage.getItem('identificador')
  }
  @Output() emitidor = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitir() {
    this.emitidor.emit(this.prospecto);
  }
}
