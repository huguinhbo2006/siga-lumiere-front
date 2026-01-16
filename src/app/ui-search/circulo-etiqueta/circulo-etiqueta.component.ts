import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circulo-etiqueta',
  templateUrl: './circulo-etiqueta.component.html',
  styleUrl: './circulo-etiqueta.component.css'
})
export class CirculoEtiquetaComponent {
  @Input() descripcion: any;
  @Input() indice: any;
  @Input() sucursal: any;
  constructor() { }

  ngOnInit(): void {
  }
}
