import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-transferencia',
  templateUrl: './modal-transferencia.component.html',
  styleUrl: './modal-transferencia.component.css'
})
export class ModalTransferenciaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: '',
    idNivel: 0,
    idCalendario: 0,
    idSucursal: 0
  };
  @Input() listas = {
    niveles: [],
    calendarios: [],
    sucursales: []
  };
  calendarios: any;
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.calendarios = this.generales.calendariosActuales(this.listas.calendarios);
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
