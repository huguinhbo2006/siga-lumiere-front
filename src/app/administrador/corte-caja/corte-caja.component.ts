import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
import { PdfService } from '../../servicios/pdf.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrl: './corte-caja.component.css'
})
export class CorteCajaComponent {
  ingresos: any;
  egresos: any;
  cargando = false;
  total: any;
  administrativo: any;
  busqueda = localStorage.getItem('sucursal')?.toString();
  fecha: any;
  existe = false;
  monto: any;
  constructor(private generales: GeneralesService,
              private servicios: BalancesService,
              private pdf: PdfService){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicios.corte({id: this.busqueda}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.ingresos = respuesta.ingresos;
      this.egresos = respuesta.egresos;
      this.total = respuesta.total;
      this.administrativo = respuesta.administrativo;
      this.existe = respuesta.existe;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  imprimirCorte(){
    this.pdf.pdfCorte({});
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
