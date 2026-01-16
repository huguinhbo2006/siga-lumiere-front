import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ValesService } from '../../servicios/vales.service';

@Component({
  selector: 'app-recepcion-vales',
  templateUrl: './recepcion-vales.component.html',
  styleUrl: './recepcion-vales.component.css'
})
export class RecepcionValesComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Calendario', 'Monto', 'Sucursal de Emision', 'Fecha'],
    encabezados: ['folio', 'calendario', 'montoFormato', 'sucursal', 'fechaFormato'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ValesService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.recibidos().subscribe((respuesta: any) => {
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
      this.generales.mensajeCorrecto('Vale aceptado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  rechazar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Vale eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    })
  }
}
