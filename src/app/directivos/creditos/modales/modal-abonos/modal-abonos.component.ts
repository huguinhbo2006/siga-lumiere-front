import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { CreditosService } from '../../../../servicios/creditos.service';
import { datatableConfig } from '../../../../interfaces/tables.interface';
@Component({
  selector: 'app-modal-abonos',
  templateUrl: './modal-abonos.component.html',
  styleUrl: './modal-abonos.component.css'
})
export class ModalAbonosComponent {
  @Input() datos: any;
  configuracion: datatableConfig = {
    alias: ['Abono', 'Forma', 'Usuario', 'Monto',],
    encabezados: ['tipoNombre', 'forma', 'empleado', 'monto'],
    busqueda: true
  };
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
