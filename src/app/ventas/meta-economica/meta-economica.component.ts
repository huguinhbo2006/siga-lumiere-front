import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasEconomicasService } from '../../servicios/metas-economicas.service';

@Component({
  selector: 'app-meta-economica',
  templateUrl: './meta-economica.component.html',
  styleUrl: './meta-economica.component.css'
})
export class MetaEconomicaComponent {
  cargando = false;
  datos: any;
  constructor(private generales: GeneralesService, private servicio: MetasEconomicasService){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.obtener().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
