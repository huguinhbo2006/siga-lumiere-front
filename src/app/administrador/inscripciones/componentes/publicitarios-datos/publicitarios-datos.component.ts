import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-publicitarios-datos',
  templateUrl: './publicitarios-datos.component.html',
  styleUrl: './publicitarios-datos.component.css'
})
export class PublicitariosDatosComponent {
  @Input() idNivel = 0;
  @Input() datos = {
    idMedioContacto: 0,
    idMedioPublicitario: 0,
    idViaPublicitaria: 0,
    idMotivoInscripcion: 0,
    idMotivoBachillerato: 0,
    idCampania: 0,
    curso: false,
    idEmpresa: 0
  }
  @Input() listas = {
    contacto: [],
    medios: [],
    vias: [],
    motivos: [],
    bachillerato: [],
    campanias: [],
    empresas: []
  }
  @Output() anterior = new EventEmitter<any>();
  @Output() siguiente = new EventEmitter<any>();
  vias: any;
  constructor(private generales: GeneralesService){}
  
  ngOnInit(){
    if(this.datos.idMedioContacto > 0){
      this.traerVias(true);
    }
  }

  traerVias(inicio: boolean){
    this.datos.idViaPublicitaria = (inicio) ? this.datos.idViaPublicitaria : 0;
    this.vias = this.generales.sublista(this.listas.vias, this.datos.idMedioPublicitario, 'idMedioPublicitario');
  }

  emitirAnterior(){
    this.anterior.emit(true);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }
}
