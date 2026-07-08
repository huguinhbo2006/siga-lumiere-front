import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
  };
  @Input() modificar = false;
  localDato: any = { nombre: '' };

  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.localDato = this.dato ? JSON.parse(JSON.stringify(this.dato)) : { nombre: '' };
  }
  
  emitir() {
    this.emitidor.emit(this.localDato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}