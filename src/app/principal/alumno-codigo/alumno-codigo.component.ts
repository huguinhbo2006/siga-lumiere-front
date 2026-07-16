import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-alumno-codigo',
  templateUrl: './alumno-codigo.component.html',
  styleUrl: './alumno-codigo.component.css'
})
export class AlumnoCodigoComponent {
  private rutaActivada = inject(ActivatedRoute);
  private servicio = inject(AlumnosService);
  private generales = inject(GeneralesService);
  id: any;
  datos = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codigo: '',
    fechaNacimiento: '',
  }

  ngOnInit(){
    this.id = this.rutaActivada.snapshot.params['alumno'];
    this.traer();
  }

  traer(){
    this.servicio.alumno({id: this.id}).subscribe((respuesta: any) =>{
      this.datos = respuesta;
    });
  }

  modificar(){
    const body = {
      ...this.datos,
      id: this.id
    }
    this.servicio.modificarNombre(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Se ha modificado el nombre del alumno');
    });
  }
}
