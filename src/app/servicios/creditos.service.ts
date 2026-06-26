import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  private http = inject(HttpClient);
  private generales = inject(GeneralesService);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'creditos/';
  
  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  traer(body: any){
    const url = this.uri + 'traer';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  abono(body: any){
    const url = this.uri + 'abono';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any): boolean {
    if (this.generales.validarString(dato.monto)) {
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    const montoNum = parseFloat(dato.monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      this.generales.mensajeError('El monto debe ser un número mayor a cero');
      return false;
    }
    if (this.generales.validarEntero(dato.idFormaPago)) {
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
      return false;
    }
    if (this.generales.validarEntero(dato.idCuenta) && dato.idFormaPago > 1) {
      this.generales.mensajeError('No se ha seleccionado la cuenta');
      return false;
    }
    if (this.generales.validarEntero(dato.idPrestador)) {
      this.generales.mensajeError('No se ha seleccionado el prestador');
      return false;
    }
    if (this.generales.validarEntero(dato.idCalendario)) {
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if (this.generales.validarEntero(dato.idNivel)) {
      this.generales.mensajeError('No se ha seleccionado el nivel');
      return false;
    }
    return true;
  }

  validarAbono(dato: any): boolean {
    if (this.generales.validarString(dato.monto)) {
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    const montoNum = parseFloat(dato.monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      this.generales.mensajeError('El monto debe ser un número mayor a cero');
      return false;
    }
    if (this.generales.validarEntero(dato.idFormaPago)) {
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
      return false;
    }
    if (this.generales.validarEntero(dato.idCuenta) && dato.idFormaPago > 1) {
      this.generales.mensajeError('No se ha seleccionado la cuenta');
      return false;
    }
    if (this.generales.validarEntero(dato.tipo)) {
      this.generales.mensajeError('No se ha seleccionado el tipo de abono');
      return false;
    }
    return true;
  }
}
