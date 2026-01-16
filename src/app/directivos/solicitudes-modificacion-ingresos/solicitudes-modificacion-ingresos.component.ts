import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { IngresosService } from '../../servicios/ingresos.service';

@Component({
  selector: 'app-solicitudes-modificacion-ingresos',
  templateUrl: './solicitudes-modificacion-ingresos.component.html',
  styleUrl: './solicitudes-modificacion-ingresos.component.css'
})
export class SolicitudesModificacionIngresosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Empleado', 'Fecha de modificacion', 'Rubro', 'Tipo', 'Forma de pago', 'Metodo de pago', 'Cuenta', 'Banco', 'Concepto', 'Monto', 'Observaciones'],
    encabezados: ['folio', 'empleado', 'fecha', 'rubro', 'tipo', 'forma', 'metodo', 'cuenta', 'banco', 'concepto', 'monto', 'observaciones'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: IngresosService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.solicitudes().subscribe((respuesta: any) => {
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
      this.generales.mensajeCorrecto('Solicitud aceptada correctamente');
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
      this.generales.mensajeCorrecto('Solicitud rechazada correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
