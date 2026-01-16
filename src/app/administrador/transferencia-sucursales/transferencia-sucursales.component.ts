import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TransferenciasService } from '../../servicios/transferencias.service';

@Component({
  selector: 'app-transferencia-sucursales',
  templateUrl: './transferencia-sucursales.component.html',
  styleUrl: './transferencia-sucursales.component.css'
})
export class TransferenciaSucursalesComponent {
  configuracion: datatableConfig = {
    alias: ['Monto', 'Calendario', 'Nivel'],
    encabezados: ['monto', 'calendario', 'nivel'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: TransferenciasService){}
  
  ngOnInit(): void {
    this.recibidas();
  }

  recibidas(){
    this.cargando = true;
    this.servicio.recibidas({}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  aceptar(){
    this.cargando = true;
    this.servicio.aceptar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Transferencia aceptada correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  rechazar(){
    this.cargando = true;
    this.servicio.rechazar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Transferencia rechazada correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
