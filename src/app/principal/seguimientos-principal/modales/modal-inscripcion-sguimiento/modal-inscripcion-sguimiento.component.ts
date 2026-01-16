import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { InscripcionesService } from '../../../../servicios/inscripciones.service';

@Component({
  selector: 'app-modal-inscripcion-sguimiento',
  templateUrl: './modal-inscripcion-sguimiento.component.html',
  styleUrl: './modal-inscripcion-sguimiento.component.css'
})
export class ModalInscripcionSguimientoComponent {
   @Input() alumno = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    celular: '',
    correo: '',
    idSexo: 0,
    fechaNacimiento: ''
  };

  @Input() grupo = {
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

  @Input() esVentas = false;

  bloqueos = {
    alumno: false,
    domicilio: true,
    tutor: true,
    escolares: true,
    inscripcion: true,
    cuenta: true,
    facturacion: true,
    publicitarios: true
  }
  validar = {
    alumno: false,
    domicilio: false,
    tutor: false,
    escolares: false,
    inscripcion: false,
    cuenta: false,
    facturacion: false,
    publicitarios: false
  }

  inscripcion = {
    alumno: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      celular: '',
      correo: '',
      idSexo: 0,
      fechaNacimiento: ''
    },
    domicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      idEstado: 0,
      idMunicipio: 0,
    },
    tutor: {
      nombre: '',
      telefono: '',
      celular: ''
    },
    escolares: {
      idTipoEscuela: 0,
      idEscuela: 0,
      idEstado: 0,
      idMunicipio: 0,
      promedio: '',
      intentos: '',
      idUniversidad: 0,
      idCentroUniveristario: 0,
      idCarrera: 0,
      idNivel: 0
    },
    publicitarios: {
      idMedioContacto: 0,
      idMedioPublicitario: 0,
      idViaPublicitaria: 0,
      idMotivoInscripcion: 0,
      idCampania: 0,
      idMotivoBachillerato: 0,
      idEmpresasCursos: 0,
      estudio: 0,
      idNivel: 0
    },
    inscripcion: {
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
    },
    cuenta: {
      cargos: Array<any>(),
      abonos: Array<any>(),
      descuentos: Array<any>(),
      IVA: false,
      tipoPago: 0
    },
    fiscales: {
      razonSocial: '',
      RFC: '',
      domicilio: '',
      colonia: '',
      codigoPostal: '',
      telefono: '',
      usoCFDI: '',
      correo: '',
    },
    usuario: localStorage.getItem('identificador'),
    sucursal: localStorage.getItem('sucursal')
  }
  @Output() emitidor = new  EventEmitter<any>();
  @Input() listas: any;
  constructor(private generales: GeneralesService,
              private validaciones: InscripcionesService) { }


  ngOnInit(): void {
    this.inscripcion.alumno = this.alumno;
    this.inscripcion.inscripcion = this.grupo;
  }

  validarInscripcion(tab: any){
    //Validacion Alumno
    this.bloqueos.alumno = false;
    if(tab === 'alumno'){
      return this.generales.seleccionarTab('alumno');
    }
    if(!this.validaciones.validarAlumno(this.inscripcion.alumno)){
      return 0;
    }
    
    //Validacion Inscripciones
    this.bloqueos.inscripcion = false;
    if(tab === 'grupo'){
      return this.generales.seleccionarTab('grupo');
    }
    if(!this.validaciones.validarInscripcion(this.inscripcion.inscripcion)){
      return 0;
    }
    
    //Validacion Domicilio
    this.bloqueos.domicilio = false;
    if(tab === 'domicilio'){
      return this.generales.seleccionarTab('domicilio');
    }
    if(!this.validaciones.validarDomicilio(this.inscripcion.domicilio)){
      return 0;
    }

    //Validacion Tutor
    this.bloqueos.tutor = false;
    if(tab === 'tutor'){
      return this.generales.seleccionarTab('tutor');
    }
    if(!this.validaciones.validarTutor(this.inscripcion.tutor)){
      return 0;
    }

    //Validacion Escolares
    this.bloqueos.escolares = false;
    if(tab === 'escolares'){
      return this.generales.seleccionarTab('escolares');
    }
    if(!this.validaciones.validarEscolares(this.inscripcion.escolares)){
      return 0;
    }

    //Validacion Publicitarios
    this.bloqueos.publicitarios = false;
    if(tab === 'publicitarios'){
      return this.generales.seleccionarTab('publicitarios');
    }
    if(!this.validaciones.validarPublicitarios(this.inscripcion.publicitarios)){
      return 0;
    }

    //Validacion Cuenta
    this.bloqueos.cuenta = false;
    this.validar.cuenta = true;
    if(tab === 'cuenta'){
      return this.generales.seleccionarTab('cuenta');
    }
  }

  emitir() {
    this.emitidor.emit(this.inscripcion);
  }
}
