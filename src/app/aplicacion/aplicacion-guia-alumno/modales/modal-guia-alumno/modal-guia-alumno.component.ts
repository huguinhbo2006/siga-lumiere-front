import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-guia-alumno',
  templateUrl: './modal-guia-alumno.component.html',
  styleUrl: './modal-guia-alumno.component.css'
})
export class ModalGuiaAlumnoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    miniatura: '',
    banner: '',
    contenido: '',
    tipo: 0
  };
  opciones = [
    { id: 1, nombre: 'Texto' },
    { id: 2, nombre: 'Imagen' }
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
