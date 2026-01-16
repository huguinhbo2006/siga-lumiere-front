import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-lectura',
  templateUrl: './modal-lectura.component.html',
  styleUrl: './modal-lectura.component.css'
})
export class ModalLecturaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    tipo: 0,
    contenido: ''
  };
  @Input() modificar = false;
  tipos = [
    { id: 1, nombre: 'Lectura' },
    { id: 2, nombre: 'Imagen' },
  ]
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
