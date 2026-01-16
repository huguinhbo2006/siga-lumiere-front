import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-domicilio-datos',
  templateUrl: './domicilio-datos.component.html',
  styleUrl: './domicilio-datos.component.css'
})
export class DomicilioDatosComponent {
  @Input() listas = {
    estados: [],
    municipios: []
  }
  @Input() datos = {
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    codigoPostal: '',
    idEstado: 0,
    idMunicipio: 0
  }
  @Output() anterior = new EventEmitter<any>();
  @Output() siguiente = new EventEmitter<any>();
  municipios: any;
  constructor(private generales: GeneralesService){}
  
  ngOnInit(){
    if(!this.generales.validarEntero(this.datos.idEstado)){
      this.listaMunicipios(true);
    }
  }

  listaMunicipios(inicio: boolean){
    this.datos.idMunicipio = (inicio) ? this.datos.idMunicipio : 0;
    this.municipios = this.generales.sublista(this.listas.municipios, this.datos.idEstado, 'idEstado');
  }

  emitirAnterior(){
    this.anterior.emit(true);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }
}
