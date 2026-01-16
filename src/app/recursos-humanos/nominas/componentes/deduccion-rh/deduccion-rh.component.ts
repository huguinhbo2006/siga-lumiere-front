import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-deduccion-rh',
  templateUrl: './deduccion-rh.component.html',
  styleUrl: './deduccion-rh.component.css'
})
export class DeduccionRHComponent {
  @Input() deduccion = {
    idConcepto: 0,
    idFormaPago: 0,
    cantidad: '',
    valorUnitario: '',
    monto: ''
  }
  @Input() conceptos: any;
  @Input() idDepartamento: any;
  @Input() modificar = false
  @Output() emitidor = new EventEmitter();
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ]
  lista: any;
  
  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.lista = (this.idDepartamento.toString() === '1') ? 
    this.lista = this.generales.sublista(this.conceptos, '1', 'docentes') :
    this.lista = this.generales.sublista(this.conceptos, '2', 'docentes');
  }

  emitir(){
    this.deduccion.monto = (parseFloat(this.deduccion.valorUnitario) * parseFloat(this.deduccion.cantidad)).toFixed(2).toString();
    this.emitidor.emit(this.deduccion);
  }
}
