import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ParidadesService } from '../../servicios/paridades.service';

@Component({
  selector: 'app-paridades',
  templateUrl: './paridades.component.html',
  styleUrl: './paridades.component.css'
})
export class ParidadesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: ParidadesService){}
  
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
    if(this.servicio.validar(dato)){      this.servicio.nuevo(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Paridad agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.modificar(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Paridad modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Paridad activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Paridad desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Paridad eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
