import { Component, OnInit, Output, EventEmitter, Input, inject } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-prestamo',
  templateUrl: './modal-prestamo.component.html',
  styleUrl: './modal-prestamo.component.css'
})
export class ModalPrestamoComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idFormaPago: 0,
    idCuenta: 0,
    idEmpleado: 0,
    monto: '',
  };
  @Input() listas = {
    cuentas: [],
    formaspagos: [],
    empleados: [],
  };
  @Input() modificar = false;
  empleados: any;

  private generales = inject(GeneralesService);

  ngOnInit(): void {
    this.filtrar();
  }

  filtrar(){
    let sucursal = localStorage.getItem('sucursal');
    this.empleados = this.generales.sublista(this.listas.empleados, sucursal, 'idSucursal');
  }
  
  emitir(): void {
    this.emitidor.emit(this.dato);
  }
  
  cerrar(): void {
    this.generales.cerrarModal();
  }
}
