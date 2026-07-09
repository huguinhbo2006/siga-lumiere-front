import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { TiposEgresosService } from '../../servicios/tipos-egresos.service';
import { TiposPagosService } from '../../servicios/tipos-pagos.service';

@Component({
  selector: 'app-tipos-pagos',
  templateUrl: './tipos-pagos.component.html',
  styleUrl: './tipos-pagos.component.css'
})
export class TiposPagosComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Comision', 'Corte', 'Comision al corte'],
    encabezados: ['nombre', 'comision', 'corte', 'valeCorte'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: TiposPagosService){}
  
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
  
  mostrar(){    this.servicio.mostrar().subscribe((respuesta: any) => {      this.datos = respuesta;
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.nuevo(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Tipo de pago agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.modificar(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Tipo de pago modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Tipo de pago activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Tipo de pago desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Tipo de pago eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
