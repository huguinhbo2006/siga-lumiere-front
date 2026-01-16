import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasEconomicasService } from '../../servicios/metas-economicas.service';

@Component({
  selector: 'app-metas-economicas-vendedor',
  templateUrl: './metas-economicas-vendedor.component.html',
  styleUrl: './metas-economicas-vendedor.component.css'
})
export class MetasEconomicasVendedorComponent {
  cargando = false;
  datos: any;
  constructor(private generales: GeneralesService, private servicio: MetasEconomicasService){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.traer({idUsuario: localStorage.getItem('identificador')?.toString()}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
