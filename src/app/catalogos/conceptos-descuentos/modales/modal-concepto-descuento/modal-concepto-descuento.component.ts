import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-concepto-descuento',
  templateUrl: './modal-concepto-descuento.component.html',
  styleUrl: './modal-concepto-descuento.component.css'
})
export class ModalConceptoDescuentoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    tipo: 0,
    monto: '',
    forzar: false
  };
  @Input() modificar = false;

  tipos = [
    { id: 1, nombre: 'Efectivo'},
    { id: 2, nombre: 'Porcentaje'}
  ];

  private generales = inject(GeneralesService);
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
