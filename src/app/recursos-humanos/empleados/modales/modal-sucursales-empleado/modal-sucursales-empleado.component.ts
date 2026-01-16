import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { EmpleadosService } from '../../../../servicios/empleados.service';
import { datatableConfig } from '../../../../interfaces/tables.interface';

@Component({
  selector: 'app-modal-sucursales-empleado',
  templateUrl: './modal-sucursales-empleado.component.html',
  styleUrl: './modal-sucursales-empleado.component.css'
})
export class ModalSucursalesEmpleadoComponent {
  configuracion: datatableConfig = {
    encabezados: ['nombre'],
    alias: ['Nombre'],
    busqueda: true
  };
  datos: any;
  
  sucursal = 0;
  lista: any;
  seleccion: any;
  @Input() usuario: any;
  constructor(private generales: GeneralesService, private empleados: EmpleadosService) { }

  ngOnInit(): void {
    this.sucursales();
  }

  private sucursales() {
    this.empleados.sucursales(this.usuario).subscribe((respuesta: any) => {
      this.lista = respuesta.disponibles;
      this.datos = respuesta.agregadas;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  guardar() {
    const body = {
      idSucursal: this.sucursal,
      idUsuario: this.usuario.id
    };
    this.empleados.agergarSucursal(body).subscribe((respuesta: any) => {
      this.sucursal = 0;
      this.seleccion = undefined;
      this.sucursales();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  eliminar() {
    const body = {
      idSucursal: this.seleccion.id,
      idUsuario: this.usuario.id
    };
    this.empleados.eliminarSucursal(body).subscribe((respuesta: any) => {
      this.sucursal = 0;
      this.seleccion = undefined;
      this.sucursales();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
