import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-carrera',
  templateUrl: './modal-carrera.component.html',
  styleUrl: './modal-carrera.component.css'
})
export class ModalCarreraComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idUniversidad: 0,
    idCentroUniversitario: 0,
    puntaje: '',
    aspirantes: '',
    admitidos: '',
    rechazados: ''
  };
  @Input() listas = {
    universidades: [],
    centrosUniversitarios: []
  };
  centros: any;
  @Input() modificar = false;
  localDato: any;

  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.localDato = this.dato ? JSON.parse(JSON.stringify(this.dato)) : {
      nombre: '',
      idUniversidad: 0,
      idCentroUniversitario: 0,
      puntaje: '',
      aspirantes: '',
      admitidos: '',
      rechazados: ''
    };
    if (this.modificar) {
      this.centros = this.generales.sublista(this.listas.centrosUniversitarios, this.localDato.idUniversidad, 'idUniversidad');
    }
  }

  buscar(){
    this.localDato.idCentroUniversitario = 0;
    this.centros = this.generales.sublista(this.listas.centrosUniversitarios, this.localDato.idUniversidad, 'idUniversidad');
  }

  
  emitir() {
    this.emitidor.emit(this.localDato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}