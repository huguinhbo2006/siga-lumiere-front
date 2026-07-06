import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
import { TraspasosService } from '../../servicios/traspasos.service';

@Component({
  selector: 'app-balance-cuentas',
  templateUrl: './balance-cuentas.component.html',
  styleUrl: './balance-cuentas.component.css'
})
export class BalanceCuentasComponent {
  cargando = false;
  cuentas: any;
  sucursales: any;
  vista = '';
  seleccion: any;
  formas: any;
  constructor(
    public generales: GeneralesService,
    private servicios: BalancesService,
    private traspasos: TraspasosService
  ){}

  ngOnInit(){
    this.mostrar();
  }

  modal(){
    this.vista = '';
    this.generales.delay(200).then(fun =>{
      this.vista = 'traspaso';
      this.generales.abrirModal();
    });
  }

  mostrar(){
    this.servicios.cuentas().subscribe((respuesta: any) => {
      this.cuentas = respuesta.cuentas;
      this.sucursales = respuesta.sucursales;
      this.formas = respuesta.formas;
    })
  }

  traspaso(datos: any){
    if (this.seleccion.efectivo) {
      const montoATraspasar = parseFloat(datos.monto);
      const saldoDisponible = parseFloat(this.seleccion.totalFinal);
  
      if (saldoDisponible < montoATraspasar) {
        this.generales.mensajeError('Error: No cuentas con suficiente saldo en Efectivo para realizar este traspaso.');
        return; 
      }

      if(this.generales.validarEntero(datos.idCuenta)){
        this.generales.mensajeError('Error: No has seleccionado la cuenta a la que deseas traspasar el efectivo.');
        return;
      }
    }
    const body = {
      egreso: this.seleccion,
      ingreso: datos
    }

    this.traspasos.nuevo(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Traspaso realizado correctamente');
      this.mostrar();
    });
  }

  efectivo(sucursal: any){
    this.seleccion = {
      id: 0,
      efectivo: true,
      totalFinal: sucursal.total_final,
      totalIngresos: sucursal.total_ingresos,
      totalEgresos: sucursal.total_egresos,
      nombre: 'Efectivo'
    };
    this.modal();
  }
}
