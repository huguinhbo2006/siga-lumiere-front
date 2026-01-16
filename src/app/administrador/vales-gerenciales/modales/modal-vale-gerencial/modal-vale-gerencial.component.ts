import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-vale-gerencial',
  templateUrl: './modal-vale-gerencial.component.html',
  styleUrl: './modal-vale-gerencial.component.css'
})
export class ModalValeGerencialComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: '',
    observaciones: '',
    idNivel: 0,
    idCalendario: 0
  };
  @Input() modificar = false;
  @Input() listas = {
    niveles: [],
    calendarios: []
  }
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
