import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-vale-administrativos',
  templateUrl: './modal-vale-administrativos.component.html',
  styleUrl: './modal-vale-administrativos.component.css'
})
export class ModalValeAdministrativosComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: '',
    observaciones: '',
    idCalendario: 0,
    idNivel: 0
  };
  
  @Input() listas: any;
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
