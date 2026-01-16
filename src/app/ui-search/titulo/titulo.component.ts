import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {
  @Input() titulo = '';
  @Input() color = 'secondary';
  @Input() fuente = 'info';
  @Input() icono = '';
}
