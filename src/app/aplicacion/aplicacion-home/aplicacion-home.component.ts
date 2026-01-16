import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { AplicacionHomeService } from '../../servicios/aplicacion-home.service';

@Component({
  selector: 'app-aplicacion-home',
  templateUrl: './aplicacion-home.component.html',
  styleUrl: './aplicacion-home.component.css'
})
export class AplicacionHomeComponent {
  datos = {
    video: '',
    fecha: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
    web: ''
  }
  cargando = false;
  constructor(private generales: GeneralesService, private servicio: AplicacionHomeService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  modificar(){
    if(this.servicio.validar(this.datos)){
      this.cargando = true;
      this.servicio.modificar(this.datos).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Datos modificados correctamente');
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
}
