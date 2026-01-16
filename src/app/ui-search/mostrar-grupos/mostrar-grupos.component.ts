import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mostrar-grupos',
  templateUrl: './mostrar-grupos.component.html',
  styles: [
  ]
})
export class MostrarGruposComponent implements OnInit {
  @Input() grupo: any
  @Input() calificaciones = false;
  @Output() emitidor = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitir(){
    this.emitidor.emit(this.grupo);
  }
}
