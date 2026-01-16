import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() meta = {
    calendario: '',
    meta: 0,
    sucursal: '',
    mes: '',
    inscritos: 0,
    totalGeneral: 0,
    totalInscritos: 0
  }
  general = {
    calendario: '',
    meta: 0,
    sucursal: '',
    mes: '',
    inscritos: 0
  }
  seleccion: any;
  porcentaje = 0;
  bg = 'bg-info';
  activo = false;
  @Input() titulo: any;
  @Input() existe = false;
  constructor() { }

  ngOnInit(): void {
    if(this.existe){
      this.general.calendario = this.meta.calendario;
      this.general.meta = this.meta.totalGeneral;
      this.general.sucursal = 'General';
      this.general.mes = this.meta.mes;
      this.general.inscritos = this.meta.totalInscritos;
    }
    this.seleccion = this.meta;
    this.calcularPorcentajes();
  }

  calcularPorcentajes(){
    this.porcentaje = (this.seleccion.inscritos * 100) / this.seleccion.meta;
    this.porcentaje = parseInt(this.porcentaje.toString());
    if(this.porcentaje < 50){
      this.bg = 'bg-danger'
    }if(this.porcentaje >= 50 && this.porcentaje < 100){
      this.bg = 'bg-yellow';
    }else if(this.porcentaje >= 100){
      this.bg = 'bg-success';
    }
  }

  seleccionar(){
    this.seleccion = (this.activo) ? this.general : this.meta;
    this.calcularPorcentajes();
  }
}
