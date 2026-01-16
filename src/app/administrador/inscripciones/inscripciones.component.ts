import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { InscripcionesService } from '../../servicios/inscripciones.service';
import { PdfService } from '../../servicios/pdf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {
  configuracion: datatableConfig = {
    alias: ['Alumno', 'Folio'],
    encabezados: ['alumno', 'folio'],
    busqueda: true
  };
  datos: any;
  listas: any;
  grupos: any;
  cupos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  codigos: any;
  
  constructor(private generales: GeneralesService,
              private servicio: InscripcionesService,
              private pdf: PdfService,
              private router: Router  
            ){}
  
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
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar({}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta.listas;
      this.datos = respuesta.fichas;
      this.grupos = respuesta.grupos;
      this.cupos = respuesta.cupos;
      this.codigos = respuesta.codigos;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    this.cargando = true;
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Inscripcion finalizada correctamente');
      this.imprimir(respuesta.abonos);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    })
  }

  imprimir(abonos: any){
    abonos.forEach((abono: any) => {
      this.pdf.pdfRecibo(abono.id);
    });
  }

  verFicha(){
    this.router.navigate(['admin/ficha', this.seleccion.id]);
  }
}
