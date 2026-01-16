import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ver-seguimiento',
  templateUrl: './ver-seguimiento.component.html',
  styleUrl: './ver-seguimiento.component.css'
})
export class VerSeguimientoComponent {
  @Input() seguimiento: any; 
  @Output() emitidorClick = new EventEmitter<any>();
  @Output() emitidorDoble = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitirClick() {
    this.emitidorClick.emit(this.seguimiento);
  }

  emitirDoble() {
    this.emitidorDoble.emit(this.seguimiento);
  }
}
