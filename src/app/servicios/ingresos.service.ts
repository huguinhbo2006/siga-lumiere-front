import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'ingresos/';
  
  mostrar(body: any) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
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

  buscar(body: any){
    const url = this.uri + 'buscar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  gerentes(body: any){
    const url = this.uri + 'gerentes';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cargar(body: any){
    const url = this.uri + 'cargar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  voucher(body: any){
    const url = this.uri + 'voucher';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  solicitudes(){
    const url = this.uri + 'solicitudes';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  aceptar(body: any){
    const url = this.uri + 'aceptar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  rechazar(body: any){
    const url = this.uri + 'rechazar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  solicitar(body: any){
    const url = this.uri + 'solicitar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarString(dato.concepto)){
      this.generales.mensajeError('No se ha ingresado el concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    if(this.generales.validarString(dato.fecha)){
      this.generales.mensajeError('No se ha ingresado la fecha');
      return false;
    }
    if(this.generales.validarEntero(dato.idRubro)){
      this.generales.mensajeError('No se ha seleccionado un rubro');
      return false;
    }
    if(this.generales.validarEntero(dato.idTipo)){
      this.generales.mensajeError('No se ha seleccionado un tipo');
      return false;
    }
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado un calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idFormaPago)){
      this.generales.mensajeError('No se ha seleccionado una forma de pago');
      return false;
    }
    if(this.generales.validarEntero(dato.idMetodoPago)){
      this.generales.mensajeError('No se ha seleccionado un metodo de pago');
      return false;
    }
    if(this.generales.validarEntero(dato.idNivel)){
      this.generales.mensajeError('No se ha seleccionado un nivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado un calendario');
      return false;
    }
    if (parseInt(dato.idFormaPago) !== 1 && parseInt(dato.idFormaPago) !== 6 && this.generales.validarString(dato.nombreCuenta)) {
      this.generales.mensajeError('No se ha ingresado el nombre del propietario de la cuenta');
      return false;
    }
    if (parseInt(dato.idFormaPago) !== 1 && parseInt(dato.idFormaPago) !== 6 && this.generales.validarString(dato.numeroReferencia)) {
      this.generales.mensajeError('No se ha ingresado el numero de referencia de la transaccion');
      return false;
    }
    if (parseInt(dato.idFormaPago) !== 1 && parseInt(dato.idFormaPago) !== 6 && this.generales.validarEntero(dato.idBanco)) {
      this.generales.mensajeError('No se ha seleccionado el banco');
      return false;
    }
    if (parseInt(dato.idFormaPago) !== 1 && parseInt(dato.idFormaPago) !== 6 && this.generales.validarEntero(dato.idCuenta)) {
      this.generales.mensajeError('No se ha seleccionado una cuenta');
      return false;
    }
    if (!dato.modificar && parseInt(dato.idFormaPago) !== 1 && parseInt(dato.idFormaPago) !== 6 && this.generales.validarString(dato.imagen)) {
      this.generales.mensajeError('No se ha seleccionado una imagen');
      return false;
    }
    return true;
  }
}
