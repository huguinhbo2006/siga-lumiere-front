import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-pagina',
  templateUrl: './modal-pagina.component.html',
  styleUrl: './modal-pagina.component.css'
})
export class ModalPaginaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: ''
  };
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
