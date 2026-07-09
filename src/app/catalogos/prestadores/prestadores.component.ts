import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PrestadoresService } from '../../servicios/prestadores.service';

@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.component.html',
  styleUrl: './prestadores.component.css'
})
export class PrestadoresComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: PrestadoresService){}
  
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
    },
    (error: any) => {      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.nuevo(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Prestador agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      (error: any) => {        this.generales.interpretarError(error);
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.modificar(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Prestador modificado correctamente');
        this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      (error: any) => {        this.generales.interpretarError(error);
      });
    }
  }
  
  activar(){    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Prestador activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    },
    (error: any) => {      this.generales.interpretarError(error);
    });
  }
  
  desactivar(){    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Prestador desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    },
    (error: any) => {      this.generales.interpretarError(error);
    });
  }
  
  eliminar(){    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Prestador eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    },
    (error: any) => {      this.generales.interpretarError(error);
    });
  }
  
}
