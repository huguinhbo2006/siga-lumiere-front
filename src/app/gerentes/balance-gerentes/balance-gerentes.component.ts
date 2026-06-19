import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-balance-gerentes',
  templateUrl: './balance-gerentes.component.html',
  styleUrl: './balance-gerentes.component.css'
})
export class BalanceGerentesComponent {
    cargando = false;
    total: any;
    administrativo: any;
    busqueda = localStorage.getItem('sucursal')?.toString();
    existe = false;
    monto: any;
    mostrarTotal = false;
    cuentas: any;
    constructor(public generales: GeneralesService, private servicios: BalancesService){
      this.mostrar();
    }

    ngOnInit(){
      this.mostrar();
    }
  
    mostrar(){
      this.cargando = true;
      this.servicios.mostrar({id: this.busqueda}).subscribe((respuesta: any) => {
        this.cargando = false;
        this.total = respuesta.total;
        this.administrativo = respuesta.administrativo;
        this.existe = respuesta.existe;
        this.cuentas = respuesta.cuentas;
        this.generales.delay(2000).then(fun => {
          this.mostrarTotal = true;
        });
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
}
