import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-credito',
  templateUrl: './modal-credito.component.html',
  styleUrl: './modal-credito.component.css'
})
export class ModalCreditoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idFormaPago: 0,
    idCuenta: 0,
    idSucursal: 0,
    idPrestador: 0,
    idCalendario: 0,
    idNivel: 0,
    monto: '',
    observaciones: '',
    tipo: 1
  };
  @Input() listas = {
    cuentas: [],
    formaspagos: [],
    prestadores: [],
    sucursales: [],
    calendarios: [],
    niveles: [],
    antiguos: [],
    actuales: []
  };
  tipos = [
    { id: 1, nombre: 'Proovedor' },
    { id: 2, nombre: 'Calendario' }
  ];
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
