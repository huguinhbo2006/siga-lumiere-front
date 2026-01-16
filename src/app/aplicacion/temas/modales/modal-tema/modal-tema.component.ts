import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-tema',
  templateUrl: './modal-tema.component.html',
  styleUrl: './modal-tema.component.css'
})
export class ModalTemaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idSeccion: 0,
    imagen: ''
  };
  @Input() modificar = false;
  @Input() idSeccion = 0;
  @Input() nombreSeccion = '';
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.dato.idSeccion = this.idSeccion;
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
