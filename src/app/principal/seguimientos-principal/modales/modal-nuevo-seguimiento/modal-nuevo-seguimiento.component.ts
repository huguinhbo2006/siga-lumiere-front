import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ConceptosDescuentosService } from '../../../../servicios/conceptos-descuentos.service';

@Component({
  selector: 'app-modal-nuevo-seguimiento',
  templateUrl: './modal-nuevo-seguimiento.component.html',
  styles: [
  ]
})
export class ModalNuevoSeguimientoComponent implements OnInit {
  seguimiento = {
    comentario: '',
    medio: 0,
    fecha: '',
    tipo: 0,
    descuento: '',
    tipoDescuento: 0,
    caducidad: '',
    conceptoDescuento: 0
  };
  tipo = [
    {id: 1, nombre: 'Seguimiento'},
    {id: 2, nombre: 'Descuento'}
  ];
  listaMediosContacto = [
    {id:1, nombre: 'Whatsapp'},
    {id: 2, nombre: 'Facebook'},
    {id: 3, nombre: 'Instagram'},
    {id: 4, nombre: 'Telegram'},
    {id: 5, nombre: 'Llamada'},
    {id: 6, nombre: 'Presencial'}
  ];
  tiposDescuento = [
    {id: 1, nombre: '%'},
    {id: 2, nombre: '$'}
  ];
  listaMotivosDescuento: any;
  @Output() emitidor = new EventEmitter<any>();
  constructor(private generales: GeneralesService,
              private motivos: ConceptosDescuentosService) { }

  ngOnInit(): void {
    this.traerConceptosDescuentos();
    this.seguimiento.fecha = this.generales.hoy();
  }

  traerConceptosDescuentos() {
    this.motivos.mostrar().subscribe(respuesta => {
      this.listaMotivosDescuento = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  emitir() {
    this.emitidor.emit(this.seguimiento);
  }
}
