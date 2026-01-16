import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificadorService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + this.generales.getSesionToken()
  });
  uri = environment.url + 'calificador/';
  

  selects() {
    const url = this.uri + 'selects';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  horarios(idTurno: any) {
    const url = this.uri + 'horarios';
    return this.http.post(url, {idTurno}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  grupos(body: any) {
    const url = this.uri + 'grupos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  alumnos(body: any) {
    const url = this.uri + 'alumnos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerExamenes(body: any) {
    const url = this.uri + 'traerExamenes';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerSecciones(body: any) {
    const url = this.uri + 'traerSecciones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  guardarSecciones(body: any) {
    const url = this.uri + 'guardarSecciones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
}
