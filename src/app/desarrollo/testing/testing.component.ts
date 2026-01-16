import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { DesarrolloService } from '../../servicios/desarrollo.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {
  respuesta: any;
  constructor(private generales: GeneralesService, private servicio: DesarrolloService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.servicio.testing({idFicha: 16890, idExamen: 117}).subscribe((respuesta: any) => {
      this.respuesta = respuesta
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
