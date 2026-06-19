import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AplicacionHomeService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + 'A7bF2qLm9ZpXc4Wv3rTg5NnYjHk8sQdE1uR0tVoPwMiBlGySaDz'
  });
  uri = environment.urlQuizes + 'home/';
  
  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  modificar(body: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  validar(dato: any){
    if(this.generales.validarString(dato.video)){
      this.generales.mensajeError('No se ha ingresado un video');
      return false;
    }
    if(this.generales.validarEntero(dato.fecha)){
      this.generales.mensajeError('No se ha la fecha del examen');
      return false;
    }
    if(this.generales.validarString(dato.instagram)){
      this.generales.mensajeError('No se ha ingresado el instagram');
      return false;
    }
    if(this.generales.validarString(dato.facebook)){
      this.generales.mensajeError('No se ha ingresado el facebook');
      return false;
    }
    if(this.generales.validarString(dato.tiktok)){
      this.generales.mensajeError('No se ha ingresado el tiktok');
      return false;
    }
    if(this.generales.validarString(dato.youtube)){
      this.generales.mensajeError('No se ha ingresado el youtube');
      return false;
    }
    if(this.generales.validarString(dato.web)){
      this.generales.mensajeError('No se ha ingresado la pagina web');
      return false;
    }
    return true;
  }
}
