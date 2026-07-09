import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
@Component({
  selector: 'app-empleado-imagenes',
  templateUrl: './empleado-imagenes.component.html',
  styleUrl: './empleado-imagenes.component.css'
})
export class EmpleadoImagenesComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato: any;
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
