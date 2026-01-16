import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  @Input() grupo: any;
  constructor() { }

  ngOnInit(): void {
  }
}
