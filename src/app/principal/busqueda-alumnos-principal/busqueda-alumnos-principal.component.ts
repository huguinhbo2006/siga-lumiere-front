import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';

@Component({
  selector: 'app-busqueda-alumnos-principal',
  templateUrl: './busqueda-alumnos-principal.component.html',
  styleUrl: './busqueda-alumnos-principal.component.css'
})
export class BusquedaAlumnosPrincipalComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Apellido paterno', 'Apellido materno'],
    encabezados: ['nombre', 'apellidoPaterno', 'apellidoMaterno'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda: any;
  
  constructor(private generales: GeneralesService,
              private rutaActiva: ActivatedRoute,
              private servicio: AlumnosService,
              private router: Router
            ){}

  ngOnInit(){
    this.buscar();
  }

  buscar(){
    this.cargando = true;
    this.servicio.buscar({busqueda: this.rutaActiva.snapshot.params['alumno']}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  ir(){
    this.router.navigate(['admin/alumno', this.seleccion.id]);
  }
}
