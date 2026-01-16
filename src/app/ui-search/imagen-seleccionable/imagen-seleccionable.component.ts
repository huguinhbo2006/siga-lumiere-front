import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagen-seleccionable',
  templateUrl: './imagen-seleccionable.component.html',
  styleUrls: ['./imagen-seleccionable.component.css']
})
export class ImagenSeleccionableComponent {
  @Input() dato = {
    icono: '',
    nombre: '',
    existe: false
  }

  /** Emite la imagen seleccionada o null al deseleccionar */
  @Output() seleccionChange = new EventEmitter();

  toggle() {
    this.dato.existe = !this.dato.existe;
    this.seleccionChange.emit(this.dato);
  }
}
