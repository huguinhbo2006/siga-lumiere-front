import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-alumno-principal',
  templateUrl: './alumno-principal.component.html',
  styleUrl: './alumno-principal.component.css'
})
export class AlumnoPrincipalComponent {
  dato = {
    nombre: '',
    id: 0
  }
  listas = {
    inscripcion: {
      calendarios: [],
      niveles: [],
      subniveles: [],
      categorias: [],
      modalidades: [],
      cursos: [],
      sedes: [],
      turnos: [],
      horarios: [],
      sucursales: [],
      sedessucursales: []
    },
    cuenta: {
      metodos: [],
      formas: [],
      cuentas: [],
      bancos: [],
      abonos: [],
      cargos: [],
      descuentos: [],
      tipos: [],
      cursos: []
    },
    escolares: {
      tipos: [],
      escuelas: [],
      estados: [],
      municipios: [],
      universidades: [],
      centros: [],
      carreras: []
    },
    publicitarios: {
      contacto: [],
      medios: [],
      vias: [],
      motivos: [],
      bachillerato: [],
      campanias: [],
      empresas: []
    }
  }
  codigos: any;
  grupos: any;
  cupos: any;
  vista = 0;
  ventana = '';
  cargando = false;
  constructor(
    private generales: GeneralesService,
    private rutaActiva: ActivatedRoute, 
    private servicio: AlumnosService,
    private pdf: PdfService
  ){}

  ngOnInit(){
    this.dato.id = this.rutaActiva.snapshot.params['alumno'];
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.traer({id: this.dato.id}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta.listas;
      this.cupos = respuesta.cupos;
      this.grupos = respuesta.grupos;
      this.codigos = respuesta.codigos;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  modal(ventana: any){
    this.ventana = '';
    this.generales.delay(500).then(fun => {
      this.ventana = ventana;
      this.generales.abrirModal();
    })
  }

  inscripcion(dato: any){
    dato.idAlumno = this.dato.id;
    this.cargando = true;
    this.servicio.inscripcion(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Inscripcion finalizada correctamente');
      this.imprimir(respuesta.abonos);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  imprimir(abonos: any){
    abonos.forEach((abono: any) => {
      this.pdf.pdfRecibo(abono.id);
    });
  }
}
