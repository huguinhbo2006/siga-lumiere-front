import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { HorariosService } from '../../../../servicios/horarios.service';
import { GruposService } from '../../../../servicios/grupos.service';
import { datatableConfig } from '../../../../interfaces/tables.interface';

@Component({
  selector: 'app-modal-horarios',
  templateUrl: './modal-horarios.component.html',
  styleUrl: './modal-horarios.component.css'
})
export class ModalHorariosComponent {
  configuracion: datatableConfig = {
    alias: ['Horarios'],
    encabezados: ['nombre'],
    busqueda: true
  };
  @Input() dato = {
    id: 0,
  };
  @Input() grupo = {
    idAltaCurso: 0,
    idHorario: 0,
    idTurno: 0
  }
  listas = {
    horarios: [],
    turnos: [],
    grupos: new Array
  }
  horarios: any;
  seleccion: any;
  constructor(private generales: GeneralesService,
              private servicio: GruposService) { }
  
  ngOnInit(): void {
    this.grupo.idAltaCurso = this.dato.id;
    this.mostrar();
  }

  buscar(){
    this.horarios = this.generales.faltantes(this.listas.grupos, this.listas.horarios, 'idHorario');
    this.horarios = this.generales.sublista(this.horarios, this.grupo.idTurno,'idTurno');
  }

  mostrar(){
    this.servicio.mostrar(this.grupo).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevo(){
    this.servicio.nuevo(this.grupo).subscribe((respuesta:any) => {
      this.listas.grupos = this.generales.agregarDatoArray(this.listas.grupos, respuesta);
      this.grupo.idHorario = 0;
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  eliminar(){
    this.servicio.eliminar(this.seleccion).subscribe((respuesta:any) => {
      this.listas.grupos = this.generales.eliminarDatoArray(this.listas.grupos, respuesta);
      this.seleccion = undefined;
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
