import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';

@Component({
  selector: 'app-balance-cuentas',
  templateUrl: './balance-cuentas.component.html',
  styleUrl: './balance-cuentas.component.css'
})
export class BalanceCuentasComponent {
  cargando = false;
  cuentas: any;
  sucursales: any;
  constructor(public generales: GeneralesService, private servicios: BalancesService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicios.cuentas().subscribe((respuesta: any) => {
      this.cargando = false;
      this.cuentas = respuesta.cuentas;
      this.sucursales = respuesta.sucursales;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  crear(cuenta: any){
    const body = {
      idCuenta: cuenta
    }
    this.servicios.nuevoCorte(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Corte creado correctamente');
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
