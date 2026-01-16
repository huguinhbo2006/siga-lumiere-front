import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute } from '@angular/router';
import { CRMService } from '../../servicios/crm.service';
import { InscripcionesService } from '../../servicios/inscripciones.service';
import { PdfService } from '../../servicios/pdf.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-seguimientos-principal',
  templateUrl: './seguimientos-principal.component.html',
  styleUrl: './seguimientos-principal.component.css'
})
export class SeguimientosPrincipalComponent {
  vista = '';
  cargando = false;
  descripciones: any;
  prospecto = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    celular: '',
    linkFacebook: '',
    linkInstagram: '',
    estatus: 0
  };

  seguimiento = {
    activo: 1,
    created_at: '',
    eliminado: 0,
    estatus: 0,
    id: 0,
    idCalendario: 0,
    idCarrera: 0,
    idCategoria: 0,
    idCentroUniversitario: 0,
    idCurso: 0,
    idFicha: 0,
    idModalidad: 0,
    idNivel: 0,
    idProspecto: 0,
    idSubnivel: 0,
    idUniversidad: 0,
    idUsuario: 0,
    updated_at: ''
  };

  listaEstatus = [
    {id: 0, nombre: 'Prospecto'},
    {id: 1, nombre: 'Interesado'},
    {id: 2, nombre: 'Inscrito'},
    {id: 3, nombre: 'No Interesado'},
    {id: 4, nombre: 'Proximo Calendario'}
  ];

  alumno = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    celular: '',
    correo: '',
    idSexo: 0,
    fechaNacimiento: ''
  };

  inscripcion = {
    id: 0,
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCategoria: 0,
    idModalidad: 0,
    idCurso: 0,
    idSede: 0,
    idAltaCurso: 0,
    idTurno: 0,
    idHorario: 0,
    idGrupo: 0,
    idSucursal: 0,
    idSucursalInscripcion: 0,
    precio: 0,
    inicio: '',
    fin: '',
    limitePago: '',
    cupo: 0,
    lugares: 0,
    inscritos: 0,
    observaciones: '',
    fecha: '',
    curso: ''
  };

  listas: any;
  constructor(private generales: GeneralesService,
              private rutaActiva: ActivatedRoute,
              private crm: CRMService,
              private inscripciones: InscripcionesService,
              private pdfs: PdfService) { }

  ngOnInit(): void {
    this.traerSeguimiento();
  }

  traerSeguimiento() {
    this.crm.traerSeguimiento(this.rutaActiva.snapshot.params['seguimiento']).subscribe((respuesta: any) => {
      this.prospecto = respuesta.prospecto;
      this.seguimiento = respuesta.seguimiento;
      this.descripciones = respuesta.descripciones;
      this.listas = respuesta.listas;

      //Alumno
      this.alumno.nombre = this.prospecto.nombre;
      this.alumno.apellidoPaterno = this.prospecto.apellidoPaterno;
      this.alumno.apellidoMaterno = this.prospecto.apellidoMaterno;
      this.alumno.celular = this.prospecto.celular;

      //Inscripcion
      this.inscripcion.idCalendario = this.seguimiento.idCalendario;
      this.inscripcion.idNivel = this.seguimiento.idNivel;
      this.inscripcion.idSubnivel = this.seguimiento.idSubnivel;
      this.inscripcion.idCategoria = this.seguimiento.idCategoria;
      this.inscripcion.idModalidad = this.seguimiento.idModalidad;
      this.inscripcion.idCurso = this.seguimiento.idCurso;
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

  guardarSeguimiento(seguimiento: any){
    if(this.crm.validarSeguimientoDescripcion(seguimiento)){
      seguimiento.idSeguimiento = this.seguimiento.id;
      seguimiento.estatusSeguimiento = this.seguimiento.estatus;
      seguimiento.idUsuario = localStorage.getItem('identificador');
      this.cargando = true;
      this.crm.guardarDescripcionSeguimiento(seguimiento).subscribe(respuesta => {
        this.cargando = false;
        this.generales.cerrarModal();
        this.traerSeguimiento();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  confirmarModificarEstatus(estatus: any) {
    swal.fire({
      title: 'Deseas modificar el estatus del seguimiento?',
      inputAttributes: {
        autocapitalize: 'on'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      icon: 'info',
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if(result.isConfirmed){
        this.modificarEstatusSeguimiento(estatus);
      }
    });
  }

  modificarEstatusSeguimiento(estatus: any) {
    if(estatus.toString() === '2'){
      this.modal('asignar');
    }else{
      const body = {
        idSeguimiento: this.seguimiento.id,
        estatus: estatus,
        idUsuario: localStorage.getItem('identificador')
      };
      this.cargando = true;
      this.crm.modificarEstatusSeguimiento(body).subscribe(respuesta => {
        this.cargando = false;
        this.generales.cerrarModal();
        this.traerSeguimiento();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  guardarCita(cita: any) {
    if(this.crm.validarCita(cita)){
      cita.idUsuario = localStorage.getItem('identificador');
      cita.idSeguimiento = this.seguimiento.id;
      this.cargando = true;
      this.crm.guardarCita(cita).subscribe(respuesta => {
        this.cargando = false;
        this.generales.cerrarModal();
        this.traerSeguimiento();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  modificarEstatusCita(cita: any) {
    cita.idUsuario = localStorage.getItem('identificador');
    cita.idSeguimiento = this.seguimiento.id;
    cita.idSucursal = localStorage.getItem('sucursal')
    this.cargando = true;
    this.crm.modificarEstatusCita(cita).subscribe(respuesta => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.traerSeguimiento();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  esVentas() {
    const body = {
      idUsuario: localStorage.getItem('identificador')
    };
    this.crm.esVentas(body).subscribe((respuesta: any) => {
      if(respuesta.es){
        this.modal('inscripcionVentas');
      }else{
        this.modal('inscripcion');
      }
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  inscribir(inscripcion: any){
    this.cargando = true;
    inscripcion.idSeguimiento = this.rutaActiva.snapshot.params['seguimiento'];
    this.inscripciones.nuevo(inscripcion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Inscripcion agregada correctamente');
      this.generales.cerrarModal();
      this.pdf(respuesta);
      this.vista = '';
      this.cargando = false;
      this.traerSeguimiento();
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  pdf(respuesta: any) {
    this.pdfs.pdfFicha(respuesta.ficha);
    respuesta.abonos.forEach((abono: any) => {
      this.pdfs.pdfRecibo(abono.id);
    });
  }

  asignarFicha(ficha: any){
    const body = {
      idFicha: ficha,
      idSeguimiento: this.seguimiento.id,
      idUsuario: localStorage.getItem('identificador')
    };
    this.cargando = true;
    this.crm.asignarFicha(body).subscribe(respuesta => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.traerSeguimiento();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
