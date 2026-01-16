import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-datos-publicitarios-principal',
  templateUrl: './modal-datos-publicitarios-principal.component.html',
  styleUrl: './modal-datos-publicitarios-principal.component.css'
})
export class ModalDatosPublicitariosPrincipalComponent {
  @Input() listas = {
    contacto: [],
    medios: [],
    vias: [],
    motivos: [],
    bachillerato: [],
    campanias: [],
    empresas: []
  }
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
  @Output() emitidor = new EventEmitter();
  constructor(private generales: GeneralesService){}

  ngOnInit(){}

  emitir(datos: any){
    this.emitidor.emit(datos);
  }

  cerrar(){
    this.generales.cerrarModal();
  }
}
