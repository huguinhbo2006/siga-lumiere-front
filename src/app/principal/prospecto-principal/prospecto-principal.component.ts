import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRMService } from '../../servicios/crm.service';

@Component({
  selector: 'app-prospecto-principal',
  templateUrl: './prospecto-principal.component.html',
  styleUrl: './prospecto-principal.component.css'
})
export class ProspectoPrincipalComponent {
  prospecto = {
    nombre: '',
    celular: '',
    idTipoEscuela: 0,
    idEscuela: 0,
    grado: 0,
    promedio: 0
  };
  idProspecto: any;
  cargando = false;
  vista = '';
  seguimientos: any;
  seleccion: any;
  listas: any;
  constructor(private generales: GeneralesService,
              public rutaActiva: ActivatedRoute,
              private crm: CRMService,
              private router: Router) { }

  ngOnInit(): void {
    this.idProspecto = this.rutaActiva.snapshot.params['prospecto'];
    this.traerPorspecto();
  }

  traerPorspecto(){
    this.crm.traerProspecto({id: this.idProspecto}).subscribe((respuesta: any) => {
      this.prospecto = respuesta.prospecto;
      this.listas = respuesta.listas;
      this.seguimientos = respuesta.seguimientos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  modal(accion: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = accion;
      this.generales.abrirModal();
    });
  }

  guardar(seguimiento: any){
    if(this.crm.validarSeguimiento(seguimiento)){
      seguimiento.idUsuario = localStorage.getItem('identificador');
      seguimiento.idProspecto = this.idProspecto;
      this.cargando = true;
      this.crm.guardarSeguimiento(seguimiento).subscribe((respuesta: any) => {
          this.generales.mensajeCorrecto('Seguimiento creado correctamente')
          this.generales.cerrarModal();
          this.seguimientos = this.generales.agregarDatoArray(this.seguimientos, respuesta);
          this.cargando = false;
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  modificar(seguimiento: any){
    if(this.crm.validarSeguimiento(seguimiento)){
      seguimiento.idUsuario = localStorage.getItem('identificador');
      seguimiento.idProspecto = this.idProspecto;
      this.cargando = true;
      this.crm.modificarSeguimiento(seguimiento).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Seguimiento modificado correctamente')
        this.generales.cerrarModal();
        this.seguimientos = this.generales.actualizarDatoArray(this.seguimientos, respuesta);
        this.cargando = false;
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  verSeguimiento(seguimiento: any) {
    this.router.navigate(['admin/seguimiento', seguimiento.id]);  
  }
}
