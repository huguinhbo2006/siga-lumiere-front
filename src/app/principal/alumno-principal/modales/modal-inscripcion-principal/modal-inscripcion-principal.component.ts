import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { InscripcionesService } from '../../../../servicios/inscripciones.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-inscripcion-principal',
  templateUrl: './modal-inscripcion-principal.component.html',
  styleUrl: './modal-inscripcion-principal.component.css'
})
export class ModalInscripcionPrincipalComponent {
  @Input() listas = {
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
    @Input() grupos: any;
    @Input() cupos: any;
    @Input() codigos: any;
    @Input() ventas = false;
    @Input() idAlumno = 0;
    @Output() emitidor = new EventEmitter<any>();
    paso = 1;
    ficha = {
      inscripcion: {
        idCalendario: 0,
        idNivel: 0,
        idSubnivel: 0,
        idCategoria: 0,
        idModalidad: 0,
        idCurso: 0,
        idSede: 0,
        idTurno: 0,
        idHorario: 0,
        idSucursalImparticion: 0,
        idSucursalInscripcion: 0,
        observaciones: '',
        idGrupo: 0,
        precio: ''
      },
      escolares: {
        idTipoEscuela: 0,
        idEscuela: 0,
        idEstado: 0,
        idMunicipio: 0,
        promedio: '',
        intentos: '',
        idUniversidad: 0,
        idCentroUniversitario: 0,
        idCarrera: 0,
      },
      publicitarios: {
        idMedioContacto: 0,
        idMedioPublicitario: 0,
        idViaPublicitaria: 0,
        idMotivoInscripcion: 0,
        idMotivoBachillerato: 0,
        idCampania: 0,
        curso: false,
        idEmpresa: 0
      },
      cuenta: {
        cargos: new Array(),
        abonos: new Array(),
        descuentos: new Array()
      }
    }
    texto = 'Alumno';
    constructor(private servicio: InscripcionesService) { }
    
    ngOnInit(): void {
    }
  
    asignarInscripcion(datos: any): any{
      if(!this.servicio.validarInscripcion(datos)){
        return 0;
      }
      this.ficha.inscripcion = datos
      this.paso = 2;
      this.asignarTexto();
    }
  
    asignarEscolares(datos: any): any{
      if(!this.servicio.validarAspiracion(datos)){
        return 0;
      }
      this.ficha.escolares = datos;
      this.paso = 3;
      this.asignarTexto();
    }
  
    asignarPublicitarios(datos: any): any{
      datos.idNivel = this.ficha.inscripcion.idNivel;
      if(!this.servicio.validarPublicitarios(datos)){
        return 0;
      }
      this.ficha.publicitarios = datos;
      this.paso = 4;
      this.asignarTexto();
    }
  
    asignarCuenta(datos: any, anterior: boolean){
      this.ficha.cuenta = datos;
      if(!anterior){
        swal.fire({
          title: "Desea terminar la inscripcion?",
          showCancelButton: true,
          confirmButtonText: "Si",
        }).then((result) => {
          if (result.isConfirmed) {
            this.emitidor.emit(this.ficha);
          }
        });
      }
      this.asignarTexto();
    }
  
    asignarTexto(){
      switch (this.paso) {
        case 1:
          this.texto = 'Inscripcion';
          break;
        case 2:
          this.texto = 'Escolares';
          break;
        case 3:
          this.texto = 'Publicitarios';
          break;
        case 4:
            this.texto = 'Cuenta';
            break;
        default:
          break;
      }
    }
}
