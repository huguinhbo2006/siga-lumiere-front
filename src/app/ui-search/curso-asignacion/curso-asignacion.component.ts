import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-curso-asignacion',
  templateUrl: './curso-asignacion.component.html',
  styleUrl: './curso-asignacion.component.css'
})
export class CursoAsignacionComponent {
  @Input() curso: any;
  constructor() { }

  ngOnInit(): void {
  }
}
