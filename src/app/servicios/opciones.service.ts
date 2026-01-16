import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'opciones/';
  
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
  
  validar(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre de la opcion');
      return false;
    }
    if(this.generales.validarString(dato.icono)){
      this.generales.mensajeError('No se ha ingresado el icono de la opcion');
      return false;
    }
    if(this.generales.validarString(dato.color)){
      this.generales.mensajeError('No se ha ingresado el color de la opcion');
      return false;
    }
    if(this.generales.validarString(dato.ruta)){
      this.generales.mensajeError('No se ha ingresado el ruta de la opcion');
      return false;
    }
    if(this.generales.validarEntero(dato.idModulo)){
      this.generales.mensajeError('No se ha seleccionado el modulo');
      return false;
    }
    return true;
  }
}
