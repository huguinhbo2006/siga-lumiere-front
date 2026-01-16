import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-economica',
  templateUrl: './modal-meta-economica.component.html',
  styleUrl: './modal-meta-economica.component.css'
})
export class ModalMetaEconomicaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idUsuario: 0,
    idCalendario: 0,
    meta: '',
    mes: 0
  };
  @Input() modificar = false;
  @Input() listas = {
    usuarios: [],
    calendarios: []
  }
  constructor(public generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
