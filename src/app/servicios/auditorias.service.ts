import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + this.generales.getSesionToken()
  });
  uri = environment.url + 'auditorias/';
  
  listas() {
    const url = this.uri + 'listas';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  ingresos(body: any) {
    const url = this.uri + 'ingresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  auditarIngreso(body: any) {
    const url = this.uri + 'auditarIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  desauditarIngreso(body: any) {
    const url = this.uri + 'desauditarIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  problemaIngreso(body: any) {
    const url = this.uri + 'problemaIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  financierosIngreso(body: any){
    const url = this.uri + 'financierosIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  observacionesIngreso(body: any){
    const url = this.uri + 'observacionesIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  voucherIngreso(body: any){
    const url = this.uri + 'voucherIngreso';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  posiblesIngresos(body: any){
    const url = this.uri + 'posiblesIngresos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
