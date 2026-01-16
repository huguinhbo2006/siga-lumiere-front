import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { SucursalesService } from '../../../../servicios/sucursales.service';

@Component({
  selector: 'app-modal-citas',
  templateUrl: './modal-citas.component.html',
  styles: [
  ]
})
export class ModalCitasComponent implements OnInit {
  @Input() cita = {
    fecha: '',
    motivo: '',
    idSucursal: 0
  };
  listaSucursales: any;
  @Output() emitidor = new EventEmitter<any>();
  constructor(private generales: GeneralesService,
              private sucursales:SucursalesService) { }

  ngOnInit(): void {
    this.traerSucursales();
  }

  traerSucursales() {
    this.sucursales.mostrar().subscribe(respuesta => {
      this.listaSucursales = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  emitir(){
    this.emitidor.emit(this.cita);
  }
}
