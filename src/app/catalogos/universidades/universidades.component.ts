import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';
import { UniversidadesService } from '../../servicios/universidades.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrl: './universidades.component.css'
})
export class UniversidadesComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Siglas'],
    encabezados: ['nombre', 'siglas'],
    busqueda: true
  };
  datos: any;
  
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: UniversidadesService){}
  
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
    if(this.servicio.validar(dato)){      this.servicio.nuevo(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Universidad agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){      this.servicio.modificar(dato).subscribe((respuesta: any) => {        this.generales.mensajeCorrecto('Universidad modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }
  
  activar(){    this.servicio.activar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Universidad activado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  desactivar(){    this.servicio.desactivar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Universidad desactivado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = respuesta;
    });
  }
  
  eliminar(){    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {      this.generales.mensajeCorrecto('Universidad eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    });
  }
  
}
