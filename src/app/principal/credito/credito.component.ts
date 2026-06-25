import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditosService } from '../../servicios/creditos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { UiSearchModule } from "../../ui-search/ui-search.module";
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css'
})
export class CreditoComponent {
  configuracion: datatableConfig = {
    alias: ['Forma de pago', 'Cuenta', 'Monto', 'Empleado', 'Ingreso', 'Egreso'],
    encabezados: ['forma', 'cuenta', 'monto', 'empleado', 'ingreso', 'egreso'],
    busqueda: true
  };
  id: any;
  datos: any;
  abonos: any;
  vista = '';
  listas = {
    formaspagos: [],
    cuentas: [] 
  };
  tipos = [
    { id: 1, nombre: 'Capital' },
    { id: 2, nombre: 'Impuestos' }
  ]
  abono= {
    idFormaPago: 0,
    idCuenta: 0,
    monto: '',
    tipo: 0
  }
  constructor(
    private rutaActivada: ActivatedRoute,
    private servicio: CreditosService,
    private generales: GeneralesService
  ){}

  ngOnInit(){
    this.id = this.rutaActivada.snapshot.params['credito'];
    this.traer();
  }

  traer(){
    this.servicio.traer({id: this.id}).subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.abonos = respuesta.datos.abonos;
      this.listas = respuesta.listas;
    });
  }
}
