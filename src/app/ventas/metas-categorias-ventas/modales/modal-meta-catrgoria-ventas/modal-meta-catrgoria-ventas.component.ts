import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-catrgoria-ventas',
  templateUrl: './modal-meta-catrgoria-ventas.component.html',
  styleUrl: './modal-meta-catrgoria-ventas.component.css'
})
export class ModalMetaCatrgoriaVentasComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    meta: '',
    idCalendario: 0,
    idCategoria: 0,
    idSucursal: 0
  };
  @Input() listas = {
    calendarios: [],
    sucursales: [],
    categorias: []
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
