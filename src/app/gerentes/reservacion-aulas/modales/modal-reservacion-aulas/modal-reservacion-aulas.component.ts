import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ReservacionAulasService } from '../../../../servicios/reservacion-aulas.service';

@Component({
  selector: 'app-modal-reservacion-aulas',
  templateUrl: './modal-reservacion-aulas.component.html',
  styleUrl: './modal-reservacion-aulas.component.css'
})
export class ModalReservacionAulasComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() lista: any;
  @Input() grupo: any;

  datos: any;
  seleccion: any;
  alta = {
    idAula: 0,
    idGrupo: 0
  }
  cargando = false;
  constructor(private generales: GeneralesService, private servicio: ReservacionAulasService) { }
  
  ngOnInit(): void {
    this.generales.delay(1000).then(fun => {
      this.mostrar();
    });
  }

  mostrar(){
    const body = {
      idCalendario: this.grupo.idCalendario,
      idGrupo: this.grupo.id,
      idSucursal: this.grupo.idSucursal
    }
    this.cargando = true;
    this.servicio.reservadas(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });

  }

  guardar(){
    this.alta.idGrupo = this.grupo;
    if(this.servicio.validar(this.alta)){
      this.cargando = true;
      this.servicio.reservar(this.alta).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Aula reservada correctamente');
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  eliminar(dato: any){
    this.cargando = true;
    this.servicio.liberar(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Aula liberada correctamente');
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
