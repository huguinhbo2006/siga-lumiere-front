import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css'
})
export class InscripcionComponent {
  @Input() ficha: any;
  fondo = '';
  vista = '';
  @Output() estatus = new EventEmitter<any>();
  @Output() calificaciones = new EventEmitter<any>();
  @Output() aspiracion = new EventEmitter<any>();
  @Output() publicitarios = new EventEmitter<any>();
  @Output() boleta = new EventEmitter<any>();
  @Output() seleccionar = new EventEmitter();
  @Output() registro = new EventEmitter();
  @Output() identificador = new EventEmitter();
  constructor(public generales: GeneralesService) { }

  ngOnInit(): void {
  }

  emitirEstatus() {
    const dato = {
      id: this.ficha.id,
      estatus: this.ficha.estatus
    }
    this.estatus.emit(dato);
  }

  emitirCalificaciones(){
    this.calificaciones.emit(this.ficha);
  }

  emitirAspiracion(){
    const body = {
      id: this.ficha.id,
      aspiracion: this.ficha.aspiracion,
      idCalendario: this.ficha.idCalendario
    }
    this.aspiracion.emit(body);
  }

  emitirPublicitarios(){
    const body = {
      id: this.ficha.id,
      publicitarios: this.ficha.publicitarios
    }
    this.publicitarios.emit(this.ficha);
  }

  emitirBoleta(){
    const body = {
      id: this.ficha.id,
      idAlumno: this.ficha.idAlumno
    }
    this.boleta.emit(body);
  }
  
  emitirSeleccionar(){
    this.seleccionar.emit(this.ficha);
  }

  emitirRegistro(){
    const body = {
      id: this.ficha.id,
      registro: this.ficha.numeroRegistro
    }
    this.registro.emit(body);
  }

  emitirIdentificador(){
    this.identificador.emit(this.ficha.id);
  }
}
