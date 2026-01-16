import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrl: './texto.component.css'
})
export class TextoComponent {
  @Input() texto = 'AQUI';

  constructor(){}
}
