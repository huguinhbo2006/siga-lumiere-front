import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-alta-cursos',
  templateUrl: './modal-alta-cursos.component.html',
  styleUrl: './modal-alta-cursos.component.css'
})
export class ModalAltaCursosComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCurso: 0,
    idModalidad: 0,
    idCategoria: 0,
    idSede: 0,
    inicio: '',
    fin: '',
    limitePago: '',
    precio: ''
  };
  @Input() listas = {
    calendarios: [],
    niveles: [],
    subniveles: [],
    cursos: [],
    modalidades: [],
    categorias: [],
    sedes: []
  };
  calendarios: any;
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.traerCalendarios();
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  traerCalendarios(){
    this.calendarios = this.generales.calendariosActuales(this.listas.calendarios);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
