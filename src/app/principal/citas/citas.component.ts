import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { CRMService } from '../../servicios/crm.service';
import { GeneralesService } from '../../servicios/generales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  configuracion: datatableConfig = {
      alias: ['Nombre', 'Motivo', 'Celular', 'Fecha'],
      encabezados: ['nombre', 'motivo', 'celular', 'fecha'],
      busqueda: true,
      multiseleccion: true
    };
  cargando = false;
  datos: any;  
  seleccion: any;
  constructor(private crm: CRMService,
              private generales: GeneralesService,
              private router: Router) { }

  ngOnInit(): void {
    this.traerCitas();
  }

  traerCitas() {
    const body = {
      idSucursal: localStorage.getItem('sucursal')
    };
    this.crm.mostrarCitas(body).subscribe(respuesta => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  verSeguimiento() {
    this.router.navigate(['siga/seguimiento', this.seleccion.idSeguimiento]); 
  }
}
