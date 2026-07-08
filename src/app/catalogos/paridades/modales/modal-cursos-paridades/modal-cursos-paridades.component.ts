import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { CursosParidadesService } from '../../../../servicios/cursos-paridades.service';

@Component({
  selector: 'app-modal-cursos-paridades',
  templateUrl: './modal-cursos-paridades.component.html',
  styleUrl: './modal-cursos-paridades.component.css'
})
export class ModalCursosParidadesComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() data: any;
  dato = {
    idParidad: 0,
    idCurso: 0,
    idEliminado: 0
  }
  cursosAgregados: any;
  cursosNoAgregados: any;
  cursos: any;
  agregados: any;
  constructor(private generales: GeneralesService,
              private servicio: CursosParidadesService) { }
  
  ngOnInit(): void {
    this.dato.idParidad = this.data.id;
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar(this.dato).subscribe((respuesta: any) => {
      this.cursos = respuesta.cursos;
      this.agregados = respuesta.agregados;
      this.cursosNoAgregados = this.generales.faltantes(this.agregados, this.cursos, 'idCurso');
      this.cursosAgregados = this.generales.iguales(this.agregados, this.cursos, 'idCurso');
    })
  }
  
  nuevo() {
    this.servicio.nuevo(this.dato).subscribe((respuesta: any) => {
      this.mostrar();
      this.generales.mensajeCorrecto('Curso agregado correctamente');
      this.dato.idCurso = 0;
    })
  }
  
  eliminar() {
    this.servicio.eliminar(this.dato).subscribe((respuesta: any) => {
      this.mostrar();
      this.generales.mensajeCorrecto('Curso eliminado correctamente');
      this.dato.idEliminado = 0;
    });
  }
}
