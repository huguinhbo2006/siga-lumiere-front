import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-meta-curso-ventas',
  templateUrl: './modal-meta-curso-ventas.component.html',
  styleUrl: './modal-meta-curso-ventas.component.css'
})
export class ModalMetaCursoVentasComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    meta: '',
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idModalidad: 0,
    idCurso: 0,
    idSucursal: 0
  };
  @Input() listas = {
    altas: [],
    calendarios: [],
    niveles: [],
    subniveles: [],
    modalidades: [],
    cursos: [],
    sucursales: []
  };
  niveles: any;
  subniveles: any;
  modalidades: any;
  cursos: any;
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    if(this.dato.idCalendario > 0){
      this.traerNiveles();
      this.traerSubniveles();
      this.traerModalidades();
      this.traerCursos();
    }
  }

  traerNiveles(){
    const busqueda = {
      idCalendario: this.dato.idCalendario
    }
    this.niveles = this.generales.sublistaMultiplesExterna(this.listas.altas, busqueda, this.listas.niveles, 'idNivel');
  }

  traerSubniveles(){
    const busqueda = {
      idCalendario: this.dato.idCalendario,
      idNivel: this.dato.idNivel
    }
    this.subniveles = this.generales.sublistaMultiplesExterna(this.listas.altas, busqueda, this.listas.subniveles, 'idSubnivel');
  }

  traerModalidades(){
    const busqueda = {
      idCalendario: this.dato.idCalendario,
      idNivel: this.dato.idNivel,
      idSubnivel: this.dato.idSubnivel
    }
    this.modalidades = this.generales.sublistaMultiplesExterna(this.listas.altas, busqueda, this.listas.modalidades, 'idModalidad');
  }

  traerCursos(){
    const busqueda = {
      idCalendario: this.dato.idCalendario,
      idNivel: this.dato.idNivel,
      idSubnivel: this.dato.idSubnivel,
      idModalidad: this.dato.idModalidad
    }
    this.cursos = this.generales.sublistaMultiplesExterna(this.listas.altas, busqueda, this.listas.cursos, 'idCurso');
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
