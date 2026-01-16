import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-estatus-ficha-principal',
  templateUrl: './modal-estatus-ficha-principal.component.html',
  styleUrl: './modal-estatus-ficha-principal.component.css'
})
export class ModalEstatusFichaPrincipalComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    id: 0,
    estatus: 0,
    monto: ''
  };
  estatus = [
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'Inasistencia' },
    { id: 3, nombre: 'Congelado' },
    { id: 4, nombre: 'Moroso' },
    { id: 5, nombre: 'Cancelado' }
  ]
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
