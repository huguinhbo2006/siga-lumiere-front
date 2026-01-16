import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';
@Component({
  selector: 'app-solicitudes-modificacion-egresos',
  templateUrl: './solicitudes-modificacion-egresos.component.html',
  styleUrl: './solicitudes-modificacion-egresos.component.css'
})
export class SolicitudesModificacionEgresosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Empleado', 'Fecha de solicitud', 'Rubro', 'Tipo', 'Cuenta', 'Forma', 'Concepto', 'Monto', 'Observaciones'],
    encabezados: ['folio', 'empleado', 'created_at', 'rubro', 'tipo', 'cuenta', 'forma', 'concepto', 'monto', 'observaciones'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: EgresosService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrarSolicitudes().subscribe((respuesta: any) => {
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
    this.servicio.aceptarModificacion(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.actualizarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  rechazar(){
    this.cargando = true;
    this.servicio.rechazarModificacion(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.actualizarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
