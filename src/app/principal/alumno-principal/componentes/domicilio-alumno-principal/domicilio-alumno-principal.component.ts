import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-domicilio-alumno-principal',
  templateUrl: './domicilio-alumno-principal.component.html',
  styleUrl: './domicilio-alumno-principal.component.css'
})
export class DomicilioAlumnoPrincipalComponent {
  @Input() datos = {
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    codigoPostal: '',
    idEstado: 0,
    idMunicipio: 0,
    modificar: false
  }
  @Input() estados: any;
  @Input() municipios: any;
  @Output() emitidor = new EventEmitter();
  lista: any;
  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.generales.delay(2000).then(fun =>{
      this.buscar();
    });
  }

  buscar(){
    this.lista = this.generales.sublista(this.municipios, this.datos.idEstado, 'idEstado');
  }

  emitir(){
    this.emitidor.emit(this.datos);
  }
}
