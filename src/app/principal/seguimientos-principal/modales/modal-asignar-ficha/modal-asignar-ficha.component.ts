import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { CRMService } from '../../../../servicios/crm.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-asignar-ficha',
  templateUrl: './modal-asignar-ficha.component.html',
  styleUrl: './modal-asignar-ficha.component.css'
})
export class ModalAsignarFichaComponent {
  folio: any;
  fichas: any;
  ficha: any;
  password: any;
  @Output() emitidor = new EventEmitter<any>();
  constructor(private generales: GeneralesService,
              private crm: CRMService) { }

  ngOnInit(): void {
  }

  buscarFicha(){
    this.crm.buscarFicha({folio: this.folio}).subscribe(respuesta => {
      this.fichas = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  fichaSeleccionada(ficha: any){
    this.ficha = ficha.id;
    this.confirmarPassword();
  }

  confirmarPassword(){
    if(this.generales.validarString(this.password)){
      return this.generales.mensajeError('No has ingresado la contraseña del administrador')
    }
    const body = {
      password: this.password
    };
    this.crm.confirmarPassword(body).subscribe(respuesta => {
      this.emitidor.emit(this.ficha);
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
