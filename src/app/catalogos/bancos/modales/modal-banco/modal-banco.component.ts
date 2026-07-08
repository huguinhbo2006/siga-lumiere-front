import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-banco',
  templateUrl: './modal-banco.component.html',
  styleUrl: './modal-banco.component.css'
})
export class ModalBancoComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
  };
  @Input() modificar = false;

  
  localDato: any = { nombre: '' };

  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    
    this.localDato = this.dato ? { ...this.dato } : { nombre: '' };
  }
  
  emitir() {
    this.emitidor.emit(this.localDato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}