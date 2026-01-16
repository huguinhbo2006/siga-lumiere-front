import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-seguimiento-principal',
  templateUrl: './modal-seguimiento-principal.component.html',
  styleUrl: './modal-seguimiento-principal.component.css'
})
export class ModalSeguimientoPrincipalComponent {
  @Input() seguimiento = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCategoria: 0,
    idModalidadCurso: 0,
    idModalidad: 0,
    idCurso: 0,
    idUsuario: localStorage.getItem('identificador'),
    idProspecto: 0,
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCarrera: 0,
    estatus: 0,
    idFicha: 0,
    idMedioContacto: 0
  };
  listaNiveles: any;
  listaSubniveles: any;
  listaCategorias: any;
  listaModalidades: any;
  listaCursos: any;
  listaCentrosUniversitarios: any;
  listaCarreras: any;
  listaEstatus = [
    {id: 0, nombre: 'Prospecto'},
    {id: 1, nombre: 'Interesado'},
    {id: 3, nombre: 'No Interesado'},
    {id: 4, nombre: 'Proximo Calendario'}
  ]
  @Input() prospecto = 0;
  @Input() existe = false;
  @Input() listas: any;
  @Input() modificar = false;
  @Output() emitidor = new EventEmitter<any>();
  constructor(private generales: GeneralesService) { }

  ngOnInit(): void {
    this.seguimiento.idProspecto = this.prospecto;
    if(this.modificar){
      this.listaNiveles = this.listas.niveles;
      this.listaSubniveles = this.listas.subniveles;
      this.listaCategorias = this.listas.categorias;
      this.listaModalidades = this.listas.modalidades;
      this.listaCursos = this.listas.cursos;
      this.listaCentrosUniversitarios = this.listas.centros;
      this.listaCarreras = this.listas.carreras;
      this.listaNiveles = this.listas.niveles;
    }
  }

  traerNiveles(){
    const busqueda = {
      idCalendario: this.seguimiento.idCalendario
    };
    this.listaNiveles = this.generales.sublistaMultiplesExterna(this.listas.grupos ,busqueda, this.listas.niveles, 'idNivel');
    this.seguimiento.idNivel = 0;
    this.seguimiento.idSubnivel = 0;
    this.seguimiento.idCategoria = 0;
    this.seguimiento.idModalidad = 0;
    this.seguimiento.idCurso = 0;
  }

  traerSubniveles(){
    const busqueda = {
      idCalendario: this.seguimiento.idCalendario,
      idNivel: this.seguimiento.idNivel,
    };
    this.listaSubniveles = this.generales.sublistaMultiplesExterna(this.listas.grupos ,busqueda, this.listas.subniveles, 'idSubnivel');
    this.seguimiento.idSubnivel = 0;
    this.seguimiento.idCategoria = 0;
    this.seguimiento.idModalidad = 0;
    this.seguimiento.idCurso = 0;
  }

  traerCategorias(){
    const busqueda = {
      idCalendario: this.seguimiento.idCalendario,
      idNivel: this.seguimiento.idNivel,
      idSubnivel: this.seguimiento.idSubnivel
    };
    this.listaCategorias = this.generales.sublistaMultiplesExterna(this.listas.grupos ,busqueda, this.listas.categorias, 'idCategoria');
    this.seguimiento.idCategoria = 0;
    this.seguimiento.idModalidad = 0;
    this.seguimiento.idCurso = 0;
  }

  traerModalidades(){
    const busqueda = {
      idCalendario: this.seguimiento.idCalendario,
      idNivel: this.seguimiento.idNivel,
      idSubnivel: this.seguimiento.idSubnivel,
      idCategoria: this.seguimiento.idCategoria
    };
    this.listaModalidades = this.generales.sublistaMultiplesExterna(this.listas.grupos ,busqueda, this.listas.modalidades, 'idModalidad');
    this.seguimiento.idModalidad = 0;
    this.seguimiento.idCurso = 0;
  }

  traerCursos(){
    const busqueda = {
      idCalendario: this.seguimiento.idCalendario,
      idNivel: this.seguimiento.idNivel,
      idSubnivel: this.seguimiento.idSubnivel,
      idCategoria: this.seguimiento.idCategoria,
      idModalidad: this.seguimiento.idModalidad
    };
    this.listaCursos = this.generales.sublistaMultiplesExterna(this.listas.grupos ,busqueda, this.listas.cursos, 'idCurso');
    this.seguimiento.idCurso = 0;
  }

  traerCentrosUniversitarios(){
    this.listaCentrosUniversitarios = this.generales.sublista(this.listas.centros, this.seguimiento.idUniversidad, 'idUniversidad');
  }

  traerCarreras(){
    const busqueda = {
      idUniversidad: this.seguimiento.idUniversidad,
      idCentroUniversitario: this.seguimiento.idCentroUniversitario,
      idCalendario: this.seguimiento.idCalendario
    };
    this.listaCarreras = this.generales.sublistaMultiples(this.listas.carreras, busqueda);
  }

  emitir(){
    this.emitidor.emit(this.seguimiento);
  }
}
