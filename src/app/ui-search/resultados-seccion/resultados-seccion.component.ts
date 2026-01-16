import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados-seccion',
  templateUrl: './resultados-seccion.component.html',
  styles: [
  ]
})
export class ResultadosSeccionComponent implements OnInit {
  @Input() seccion: any;
  constructor() { }

  ngOnInit(): void {
  }

}
