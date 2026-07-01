import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-traspaso',
  templateUrl: './modal-traspaso.component.html',
  styleUrl: './modal-traspaso.component.css'
})
export class ModalTraspasoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: '',
    idFormaPago: 0,
    idCuenta: 0
  };
  @Input() cuenta: any;
  @Input() formas = [];
  @Input() cuentas = [];
  constructor(public generales: GeneralesService) { }
  
  ngOnInit(): void {
    console.log(this.cuenta)
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
