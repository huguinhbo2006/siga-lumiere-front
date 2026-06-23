import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.css'
})
export class CalificacionesComponent {
  cargando = false;
  examenes: any;
  constructor(private generales: GeneralesService) { }

  ngOnInit(): void {}

  traercalificaciones() {
    
  }


}
