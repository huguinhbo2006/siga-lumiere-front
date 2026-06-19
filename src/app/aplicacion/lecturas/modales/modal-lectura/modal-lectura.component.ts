import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-lectura',
  templateUrl: './modal-lectura.component.html',
  styleUrl: './modal-lectura.component.css'
})
export class ModalLecturaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    tipo: 0,
    contenido: '',
    idSeccion: 0,
    idTema: 0,
    idSubtema: 0
  };
  @Input() modificar = false;
  @Input() listas = {
    secciones: [],
    temas: [],
    subtemas: []
  }
  listaTemas: any;
  listaSubtemas: any;
  tipos = [
    { id: 1, nombre: 'Lectura' },
    { id: 2, nombre: 'Imagen' },
  ]
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }

  traerTemas(){
    this.dato.idTema = 0;
    this.dato.idSubtema = 0;
    this.listaTemas = this.generales.sublista(this.listas.temas, this.dato.idSeccion, 'idSeccion');
  }

  traerSubtemas(){
    this.dato.idSubtema = 0;
    this.listaSubtemas = this.generales.sublista(this.listas.subtemas, this.dato.idTema, 'idTema');
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
