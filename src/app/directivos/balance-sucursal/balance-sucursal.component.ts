import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-balance-sucursal',
  templateUrl: './balance-sucursal.component.html',
  styleUrl: './balance-sucursal.component.css'
})
export class BalanceSucursalComponent {
  ingresos: any;
  egresos: any;
  cargando = false;
  total: any;
  administrativo: any;
  listas = {
    sucursales: []
  }
  busqueda = localStorage.getItem('sucursal')?.toString();
  existe = false;
  monto: any;
  constructor(private generales: GeneralesService, private servicios: BalancesService){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicios.mostrar({id: this.busqueda}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.ingresos = respuesta.ingresos;
      this.egresos = respuesta.egresos;
      this.total = respuesta.total;
      this.administrativo = respuesta.administrativo;
      this.existe = respuesta.existe;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  vale(){
    swal.fire({
      title: 'Ingresa el monto',
      input: 'text',
      icon: 'info',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if(this.generales.validarString(login)){
          swal.showValidationMessage(
            'No se ingresado un monto'
          )
          return false;
        }
        if(!this.generales.esNumero(login)){
          swal.showValidationMessage(
            'El valor ingresado no es numerico'
          )
          return false;
        }
        if(parseFloat(login) <= 0){
          swal.showValidationMessage(
            'El monto a congelar debe ser mayor a 0'
          )
          return false;
        }
        this.monto = login;
        return true;
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      let peticion = {
        monto: this.monto,
        idSucursal: localStorage.getItem('sucursal'),
        total: this.total
      };
      this.servicios.saldoVale(peticion).subscribe(respuesta => {
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    });
  }

  caja(){
    swal.fire({
      title: 'Ingresa el monto',
      input: 'text',
      icon: 'info',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if(this.generales.validarString(login)){
          swal.showValidationMessage(
            'No se ingresado un monto'
          )
          return false;
        }
        if(!this.generales.esNumero(login)){
          swal.showValidationMessage(
            'El valor ingresado no es numerico'
          )
          return false;
        }
        if(parseFloat(login) <= 0){
          swal.showValidationMessage(
            'El monto a congelar debe ser mayor a 0'
          )
          return false;
        }
        this.monto = login;
        return true;
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      let peticion = {
        monto: this.monto,
        idSucursal: localStorage.getItem('sucursal'),
        total: this.total
      };
      this.servicios.saldoCaja(peticion).subscribe(respuesta => {
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    });
  }

  nuevoVale(){
    this.cargando = true;
    this.servicios.nuevoVale({}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Vale creado correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
