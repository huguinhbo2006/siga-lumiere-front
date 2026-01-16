import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BloqueoHorariosService } from '../../servicios/bloqueo-horarios.service';

@Component({
  selector: 'app-bloqueo-horarios',
  templateUrl: './bloqueo-horarios.component.html',
  styleUrl: './bloqueo-horarios.component.css'
})
export class BloqueoHorariosComponent {
  cargando = false;
  grupos: any;
  constructor(private generales: GeneralesService, private servicio: BloqueoHorariosService) {}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.grupos = respuesta.grupos;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  bloquear(id: any){
    const body = { 
      id: id
    }
    this.servicio.bloquear(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Grupo bloqueado correctamente');
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  desbloquear(id: any){
    const body = {
      id: id
    }
    this.servicio.desbloquear(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Grupo desbloqueado correcatmente');
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
