import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrl: './modal-empleado.component.css'
})
export class ModalEmpleadoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    personales: {
      nombre: '',
      estadoCivil: '',
      fechaNacimiento: '',
      telefono: '',
      celular: '',
      correo: ''
    },
    domicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      idEstado: 0,
      idMunicipio: 0,
      codigoPostal: ''
    },
    fiscales: {
      nss: '',
      rfc: '',
      curp: '',
      cuentaBancaria: '',
      fechaAltaImms: '',
      fechaIngreso: '',
      fechaBaja: ''
    },
    empresa: {
      sueldoBase: '',
      sueldoFiscal: '',
      bono: '',
      idSucursal: 0,
      idDepartamento: 0,
      idPuesto: 0
    },
    imagenes: {
      actaNacimiento: '',
      comprobanteDomicilio: '',
      curp: '',
      ifef: '',
      ifet: '',
      rfc: '',
      carta1: '',
      carta2: '',
      nss: '',
      comporbanteEstudios: ''
    }
  };
  @Input() listas = {
    domicilio: {
      estados: [],
      municipios: []
    },
    empresa: {
      sucursales: [],
      departamentos: [],
      puestos: []
    }
  };
  @Input() modificar = false;
  vista = 0;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
