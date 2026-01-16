import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nomina-principal',
  templateUrl: './nomina-principal.component.html',
  styleUrl: './nomina-principal.component.css'
})
export class NominaPrincipalComponent {
  vista = 1;
  id: any;
  constructor(private generales: GeneralesService, private rutaActiva: ActivatedRoute){}

  ngOnInit(){
    this.id = this.rutaActiva.snapshot.params['nomina'];
  }
}
