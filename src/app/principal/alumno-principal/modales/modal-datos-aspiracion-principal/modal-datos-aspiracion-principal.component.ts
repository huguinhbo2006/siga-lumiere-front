import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-datos-aspiracion-principal',
  templateUrl: './modal-datos-aspiracion-principal.component.html',
  styleUrl: './modal-datos-aspiracion-principal.component.css'
})
export class ModalDatosAspiracionPrincipalComponent {
  @Input() dato = {
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCarrera: 0
  }
  @Input() listas = {
    universidades: [],
    centros: [], 
    carreras: []
  }
  centros: any;
  carreras: any;
  @Output() emitidor = new EventEmitter();

  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.traerCentros();
    this.traerCarreras();
  }

  traerCentros(){
    this.centros = this.generales.sublista(this.listas.centros, this.dato.idUniversidad, 'idUniversidad');
  }

  traerCarreras(){
    this.carreras = this.generales.sublista(this.listas.carreras, this.dato.idCentroUniversitario, 'idCentroUniversitario');
  }

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
