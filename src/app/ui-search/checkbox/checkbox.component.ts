import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Input() activo = false;
  @Input() etiqueta = '';
  @Output() emitidor = new EventEmitter<boolean>();

  cambio() {
    this.emitidor.emit(this.activo);
  }
}
