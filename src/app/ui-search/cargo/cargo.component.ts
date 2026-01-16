import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrl: './cargo.component.css'
})
export class CargoComponent {
  @Input() cargo = {
    idConcepto: 0,
    monto: '',
    concepto: ''
  }
  @Input() lista: any;
  @Output() emitidor = new EventEmitter<any>();
  constructor(public generales: GeneralesService){}
  
  ngOnInit(){}

  emitir(){
    this.emitidor.emit(this.cargo);
  }
}
