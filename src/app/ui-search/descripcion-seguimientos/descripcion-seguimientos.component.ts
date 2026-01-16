import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-descripcion-seguimientos',
  templateUrl: './descripcion-seguimientos.component.html',
  styleUrls: ['./descripcion-seguimientos.component.css']
})
export class DescripcionSeguimientosComponent implements OnInit {
  @Input() descripcion: any;
  @Output() emitidorEstatusCita = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  mostrarCita(): boolean{
    if(parseInt(this.descripcion.idCita) > 0){
      return true;
    }else{
      return false;
    }
  }

  emitirEstatusCita(estatus: any){
    const body = {
      idCita: this.descripcion.idCita,
      estatus: estatus
    };
    this.emitidorEstatusCita.emit(body);
  }
}
