import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-configuracion',
  templateUrl: './modal-configuracion.component.html',
  styleUrl: './modal-configuracion.component.css'
})
export class ModalConfiguracionComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idComponente: '',
  };
  @Input() lista: any;
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
