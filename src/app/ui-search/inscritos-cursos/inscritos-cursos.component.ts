import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscritos-cursos',
  templateUrl: './inscritos-cursos.component.html',
  styles: [
  ]
})
export class InscritosCursosComponent implements OnInit {
  @Input() meta = {
    calendario: '',
    meta: 0,
    sucursal: '',
    inscritos: 0,
    curso: '',
    imagen: '',
    metaGeneral: 0,
    inscritosGenerales: 0,
    totalInscritos: 0,
    totalGeneral: 0
  }
  general = {
    calendario: '',
    meta: 0,
    sucursal: 'General',
    inscritos: 0,
    curso: '',
    imagen: ''
  }
  seleccion: any;
  porcentaje = 0;
  bg = 'bg-info';
  activo = false;
  @Input() existe = false;
  constructor() { }

  ngOnInit(): void {
    this.seleccion = this.meta;
    this.calcularPorcentajes();
    if(this.existe){
      this.general.calendario = this.meta.calendario;
      this.general.inscritos = this.meta.totalInscritos;
      this.general.meta = this.meta.totalGeneral,
      this.general.imagen = this.meta.imagen;
      this.general.curso = this.meta.curso;
    }
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
