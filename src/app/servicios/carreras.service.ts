import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + this.generales.getSesionToken()
  });
  uri = environment.url + 'carreras/';
  
  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  modificar(body: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  eliminar(body: any){
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  activar(body: any){
    const url = this.uri + 'activar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  desactivar(body: any){
    const url = this.uri + 'desactivar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cargar(body: any){
    const url = this.uri + 'cargar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre')
      return false;
    }
    if(this.generales.validarEntero(dato.idUniversidad)){
      this.generales.mensajeError('No se ha seleccionado una universidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCentroUniversitario)){
      this.generales.mensajeError('No se ha seleccionado un centro universitario');
      return false;
    }
    if(this.generales.validarString(dato.puntaje)){
      this.generales.mensajeError('No se ha ingresado el puntaje minimo de la carrera');
      return false;
    }
    if(this.generales.validarString(dato.aspirantes)){
      this.generales.mensajeError('No se ha ingresado la cantidad de aspirantes a la carrera');
      return false;
    }
    if(this.generales.validarString(dato.aceptados)){
      this.generales.mensajeError('No se ha ingresado la cantidad de aspirantes aceptados a la carrera');
      return false;
    }
    if(this.generales.validarString(dato.rechazados)){
      this.generales.mensajeError('No se ha ingresado la cantidad de aspirantes rechazados a la carrera');
      return false;
    }
    return true;
  }
}
