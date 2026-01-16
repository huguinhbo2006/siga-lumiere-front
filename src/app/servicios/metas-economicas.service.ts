import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetasEconomicasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'metaseconomicas/';
    
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

    traer(body: any) {
      const url = this.uri + 'traer';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    obtener() {
      const url = this.uri + 'obtener';
      return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    validar(dato: any){
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.mes)){
      this.generales.mensajeError('No se ha seleccionado el mes');
      return false;
    }
    if(this.generales.validarString(dato.meta)){
      this.generales.mensajeError('No se ha ingresado la meta');
      return false;
    }
    return true;
  }
}
