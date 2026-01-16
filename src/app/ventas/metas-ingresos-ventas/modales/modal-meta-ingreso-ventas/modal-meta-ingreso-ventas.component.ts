import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-ingreso-ventas',
  templateUrl: './modal-meta-ingreso-ventas.component.html',
  styleUrl: './modal-meta-ingreso-ventas.component.css'
})
export class ModalMetaIngresoVentasComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    meta: '',
    idSucursal: 0,
    idCalendario: 0,
    mes: 0,
    idMes: 0
  };
  @Input() listas = {
    calendarios: [],
    sucursales: []
  };
  @Input() modificar = false;
  constructor(public generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.dato.idMes = this.dato.mes;
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
