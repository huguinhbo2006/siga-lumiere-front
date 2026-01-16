import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-financieros',
  templateUrl: './modal-financieros.component.html',
  styleUrl: './modal-financieros.component.css'
})
export class ModalFinancierosComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idBanco: 0,
    idCuenta: 0
  };
  @Input() bancos: any;
  @Input() cuentas: any;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
