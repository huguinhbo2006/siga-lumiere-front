import { Component, Input, OnInit, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ConfiguracionVideosService } from '../../../../servicios/configuracion-videos.service';

@Component({
  selector: 'app-modal-configuracion-video',
  templateUrl: './modal-configuracion-video.component.html',
  styleUrl: './modal-configuracion-video.component.css'
})
export class ModalConfiguracionVideoComponent {
  video = {
    idConfiguracion: 0,
    idPagina: 0,
    texto: '',
    video: '',
    titulo: ''
  };
  @Input() configuracion: any;
  lista: any;
  constructor(private generales: GeneralesService,
              private servicio: ConfiguracionVideosService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  nuevo(){
    this.video.idConfiguracion = this.configuracion;
    this.servicio.nuevo(this.video).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Video guardado correctamente');
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  mostrar(){
    this.servicio.mostrar({idConfiguracion: this.configuracion}).subscribe((respuesta: any) => {
      this.video = respuesta.datos;
      this.lista = respuesta.lista;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
