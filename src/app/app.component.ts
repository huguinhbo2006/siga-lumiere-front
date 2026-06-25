import { Component } from '@angular/core';
import { GeneralesService } from './servicios/generales.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lumiere SIGA';

  constructor(public generales: GeneralesService) { }

}
