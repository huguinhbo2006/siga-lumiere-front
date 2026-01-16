import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celda-imagenes',
  templateUrl: './celda-imagenes.component.html',
  styleUrl: './celda-imagenes.component.css'
})
export class CeldaImagenesComponent {
  @Input() imagenes: any;
  constructor() { }

  ngOnInit(): void {
  }

}
