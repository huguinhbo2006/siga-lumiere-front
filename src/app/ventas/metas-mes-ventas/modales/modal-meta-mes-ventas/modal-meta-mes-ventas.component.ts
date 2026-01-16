import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-mes-ventas',
  templateUrl: './modal-meta-mes-ventas.component.html',
  styleUrl: './modal-meta-mes-ventas.component.css'
})
export class ModalMetaMesVentasComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    meta: '',
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idSucursal: 0,
    mes: 0
  };
  @Input() listas = {
    calendarios: [],
    niveles: [],
    subniveles: [],
    sucursales: []
  };
  @Input() modificar = false;
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
