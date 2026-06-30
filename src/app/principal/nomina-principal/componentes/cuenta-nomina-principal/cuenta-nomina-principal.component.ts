import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { NominasService } from '../../../../servicios/nominas.service';

@Component({
  selector: 'app-cuenta-nomina-principal',
  templateUrl: './cuenta-nomina-principal.component.html',
  styleUrl: './cuenta-nomina-principal.component.css'
})
export class CuentaNominaPrincipalComponent {
  @Input() nomina: any;
  listas = {
    percepciones: [],
    deducciones: []
  }
  departamento: any;
  percepciones: any;
  deducciones: any;
  vista = 0;
  total = '0';
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ]
  constructor(public generales: GeneralesService, private servicio: NominasService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.cuenta({id: this.nomina}).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.percepciones = respuesta.datos.percepciones;
      this.deducciones = respuesta.datos.deducciones;
      this.departamento = respuesta.datos.departamento;
      this.calcular();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevaPercepcion(dato: any){
    dato.id = this.nomina
    this.servicio.agregarPercepcion(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Percecpcion agregada correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevaDeduccion(dato: any){
    dato.id = this.nomina
    this.servicio.agregarDeduccion(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Solicitud agregada correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  quitarPercepcion(dato: any){
    dato.idNomina = this.nomina;
    this.servicio.quitarPercepcion(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Percepcion eliminada correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  quitarDeduccion(dato: any){
    dato.idNomina = this.nomina;
    this.servicio.quitarDeduccion(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Solicitud agregada correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  calcular(){
    this.total = '0';
    this.percepciones.forEach((percepcion: any) => {
      this.total = (parseFloat(this.total) + parseFloat(percepcion.monto)).toFixed(2);
    });
    this.deducciones.forEach((deduccion: any) => {
      this.total = (parseFloat(this.total) - parseFloat(deduccion.monto)).toFixed(2);
    });
  }
}
