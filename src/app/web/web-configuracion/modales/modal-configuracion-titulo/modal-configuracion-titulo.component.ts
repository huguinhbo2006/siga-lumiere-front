import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ConfiguracionTituloService } from '../../../../servicios/configuracion-titulo.service';

@Component({
  selector: 'app-modal-configuracion-titulo',
  templateUrl: './modal-configuracion-titulo.component.html',
  styleUrl: './modal-configuracion-titulo.component.css'
})
export class ModalConfiguracionTituloComponent {
  @Input() configuracion: any;
  texto = '';
  clase = 0;
  datos = [
    {id: 'text-lumiere', nombre: 'Titulo Normal'}
  ];  
  constructor(private generales: GeneralesService, private servicio: ConfiguracionTituloService) { }
  
  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar({idConfiguracion: this.configuracion}).subscribe((respuesta: any) => {
      this.texto = respuesta.texto;
      this.clase = respuesta.clase;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevo(){
    const body = {
      idConfiguracion: this.configuracion,
      texto: this.texto,
      clase: this.clase
    }
    this.servicio.nuevo(body).subscribe((respuesta: any) => {
      this.mostrar();
      this.generales.mensajeCorrecto('Titulo agregado correctamente');
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
