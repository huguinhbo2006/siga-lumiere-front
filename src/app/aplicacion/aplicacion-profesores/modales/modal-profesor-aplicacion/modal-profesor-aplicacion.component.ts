import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
@Component({
  selector: 'app-modal-profesor-aplicacion',
  templateUrl: './modal-profesor-aplicacion.component.html',
  styleUrl: './modal-profesor-aplicacion.component.css'
})
export class ModalProfesorAplicacionComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    imagen: '',
    materia: '',
    descripcion: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
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
