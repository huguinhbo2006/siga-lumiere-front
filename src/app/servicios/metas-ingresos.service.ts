import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetasIngresosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'metasIngresos/';
  
  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
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

  metas(body: any){
    const url = this.uri + 'metas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado un calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idSucursal)){
      this.generales.mensajeError('No se ha seleccionado una sucursal');
      return false;
    }
    if(this.generales.validarEntero(dato.mes)){
      this.generales.mensajeError('No se ha seleccionado un mes');
      return false;
    }
    if(this.generales.validarString(dato.meta)){
      this.generales.mensajeError('No se ha ingresado la meta');
      return false;
    }
    return true;
  }
}
