import { Component, OnInit, Input, inject } from '@angular/core';
import { datatableConfig } from '../../../../interfaces/tables.interface';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-abonos-prestamos',
  templateUrl: './modal-abonos.component.html',
  styleUrl: './modal-abonos.component.css'
})
export class ModalAbonosPrestamosComponent implements OnInit {
  @Input() datos: any[] = [];
  
  private generales = inject(GeneralesService);

  configuracion: datatableConfig = {
    alias: ['Abono', 'Forma', 'Usuario', 'Monto'],
    encabezados: ['tipoNombre', 'forma', 'empleado', 'monto'],
    busqueda: true
  };

  ngOnInit(): void {
  }
  
  cerrar(): void {
    this.generales.cerrarModal();
  }
}
