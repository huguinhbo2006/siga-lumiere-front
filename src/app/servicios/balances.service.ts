import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + this.generales.getSesionToken()
  });
  uri = environment.url + 'balanceSucursales/';
  
  mostrar(body: any) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  corte(body: any){
    const url = this.uri + 'corte';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  nuevoVale(body: any){
    const url = this.uri + 'nuevoVale';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  saldoVale(body: any){
    const url = this.uri + 'saldoVale';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  saldoCaja(body: any){
    const url = this.uri + 'saldoCaja';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cuentas(){
    const url = this.uri + 'cuentas';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
