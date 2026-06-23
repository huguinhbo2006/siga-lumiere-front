import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-escolares-alumno-principal',
  templateUrl: './escolares-alumno-principal.component.html',
  styleUrl: './escolares-alumno-principal.component.css'
})
export class EscolaresAlumnoPrincipalComponent {
  @Input() datos = {
    idTipoEscuela: 0,
    idEscuela: 0,
    idEstado: 0,
    idMunicipio: 0,
    promedio: '',
    intentos: '',
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCarrera: 0,
  }
  @Input() idCalendario: any;
  @Input() listas = {
    tipos: [],
    escuelas: [],
    estados: [],
    municipios: [],
    universidades: [],
    centros: [],
    carreras: []
  }
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  centros: any;
  carreras: any;
  constructor(private generales: GeneralesService){}
  
  ngOnInit(){
    if(this.datos.idTipoEscuela > 0){
      this.traerCentros(true);
      this.traerCarreras(true);
    }
  }

  traerCentros(inicio: boolean){
    this.datos.idCentroUniversitario = (inicio) ? this.datos.idCentroUniversitario : 0;
    this.centros = this.generales.sublista(this.listas.centros, this.datos.idUniversidad, 'idUniversidad');
  }

  traerCarreras(inicio: boolean){
    this.datos.idCarrera = (inicio) ? this.datos.idCarrera : 0;
    this.carreras = this.generales.sublista(this.listas.carreras, this.datos.idCentroUniversitario, 'idCentroUniversitario');
    this.carreras = this.generales.sublista(this.carreras, this.idCalendario, 'idCalendario');
  }

  emitirAnterior(){
    this.anterior.emit(true);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }
}
