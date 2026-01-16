import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ficha-alumno',
  templateUrl: './ficha-alumno.component.html',
  styleUrl: './ficha-alumno.component.css'
})
export class FichaAlumnoComponent {
  @Input() ficha: any;
  @Output() emitidor = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitir(){
    this.emitidor.emit(this.ficha);
  }
}
