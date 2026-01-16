import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-descuento-principal',
  templateUrl: './descuento-principal.component.html',
  styleUrl: './descuento-principal.component.css'
})
export class DescuentoPrincipalComponent {
  @Input() dato = {
      idConcepto: 0,
      cantidad: '',
      idTipo: 0,
      idMonto: 0
    }
    forzar = false;
    @Input() lista: any;
    @Output() emitidor = new EventEmitter<any>();
    tipos = [
      { id: 2, nombre: '%' },
      { id: 1, nombre: '$' },
    ]
    asignados = [
      { id: 1, nombre: 'Total final' },
      { id: 2, nombre: 'Total curso' }
    ]
    constructor(public generales: GeneralesService){}
    
    ngOnInit(){}
  
    force(){
      this.lista.forEach((element: any) => {
        if(element.id.toString() === this.dato.idConcepto.toString()){
          this.forzar = true;
          this.dato.idTipo = element.tipo;
          this.dato.cantidad = element.monto;
          this.dato.idMonto = 2;
        }
      });
    }
  
    emitir(){
      this.emitidor.emit(this.dato);
    }
}
