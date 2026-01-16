import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-observaciones-ingreso',
  templateUrl: './modal-observaciones-ingreso.component.html',
  styleUrl: './modal-observaciones-ingreso.component.css'
})
export class ModalObservacionesIngresoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    id: 0,
    observaciones: ''
  };
  @Input() modificar = false;
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
