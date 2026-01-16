import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NominasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'nominas/';
  
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

  creadas() {
    const url = this.uri + 'creadas';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  autorizar(body: any) {
    const url = this.uri + 'autorizar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  autorizadas(body: any) {
    const url = this.uri + 'autorizadas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cobrar(body: any) {
    const url = this.uri + 'cobrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  solicitudes() {
    const url = this.uri + 'solicitudes';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  aceptarSolicitud(body: any) {
    const url = this.uri + 'aceptarSolicitud';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  rechazarSolicitud(body: any) {
    const url = this.uri + 'rechazarSolicitud';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  nomina(body: any) {
    const url = this.uri + 'nomina';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cuenta(body: any) {
    const url = this.uri + 'cuenta';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarPercepcion(body: any) {
    const url = this.uri + 'agregarPercepcion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarDeduccion(body: any) {
    const url = this.uri + 'agregarDeduccion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  quitarPercepcion(body: any) {
    const url = this.uri + 'eliminarPercepcion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  quitarDeduccion(body: any) {
    const url = this.uri + 'eliminarDeduccion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    return true;
  }
}
