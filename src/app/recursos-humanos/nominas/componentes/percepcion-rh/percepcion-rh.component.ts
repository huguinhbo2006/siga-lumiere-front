import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-percepcion-rh',
  templateUrl: './percepcion-rh.component.html',
  styleUrl: './percepcion-rh.component.css'
})
export class PercepcionRHComponent {
  @Input() conceptos: any;
  @Input() percepcion = {
    id: 0,
    idConcepto: 0,
    idFormaPago: 1,
    valorUnitario: '',
    cantidad: '1',
    monto: ''
  };
  @Input() idDepartamento: any;
  @Output() emitidor = new EventEmitter();
  lista: any;
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ]
  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.lista = (this.idDepartamento.toString() === '1') ? 
    this.lista = this.generales.sublista(this.conceptos, '1', 'docentes') :
    this.lista = this.generales.sublista(this.conceptos, '2', 'docentes');
  }

  emitir(){
    this.percepcion.monto = (parseFloat(this.percepcion.valorUnitario) * parseFloat(this.percepcion.cantidad)).toFixed(2).toString();
    this.emitidor.emit(this.percepcion);
  }
}
