import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-calendario',
  templateUrl: './modal-calendario.component.html',
  styleUrl: './modal-calendario.component.css'
})
export class ModalCalendarioComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    inicio: '',
    fin: ''
  };
  @Input() modificar = false;

  localDato: any = { nombre: '', inicio: '', fin: '' };

  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.localDato = this.dato ? JSON.parse(JSON.stringify(this.dato)) : { nombre: '', inicio: '', fin: '' };
  }
  
  emitir() {
    this.emitidor.emit(this.localDato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}