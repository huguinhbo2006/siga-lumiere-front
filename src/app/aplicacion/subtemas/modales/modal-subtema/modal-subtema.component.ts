import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-subtema',
  templateUrl: './modal-subtema.component.html',
  styleUrl: './modal-subtema.component.css'
})
export class ModalSubtemaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idTema: 0,
    imagen: ''
  };
  temas: any;
  @Input() idTema = 0;
  @Input() nombreTema = '';
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.dato.idTema = this.idTema;
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
