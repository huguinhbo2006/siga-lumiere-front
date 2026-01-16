import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosCuentasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'estadocuenta/';
  
  mostrar(body: any) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  agregarCargo(body: any) {
    const url = this.uri + 'agregarCargo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  quitarCargo(body: any) {
    const url = this.uri + 'quitarCargo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarAbono(body: any) {
    const url = this.uri + 'agregarAbono';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  quitarAbono(body: any){
    const url = this.uri + 'quitarAbono';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  agregarDescuento(body: any){
    const url = this.uri + 'agregarDescuento';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  quitarDescuento(body: any){
    const url = this.uri + 'quitarDescuento';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarDevolucion(body: any){
    const url = this.uri + 'agregarDevolucion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  quitarDevolucion(body: any){
    const url = this.uri + 'quitarDevolucion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agregarExtra(body: any){
    const url = this.uri + 'agregarExtra';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  quitarExtra(body: any){
    const url = this.uri + 'quitarExtra';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validarCargo(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado el concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    return true;
  }

  validarAbono(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado el concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    if(this.generales.validarEntero(dato.idFormaPago)){
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
      return false;
    }
    if(parseInt(dato.idFormaPago.toString()) > 1){
      if(this.generales.validarString(dato.idConcepto)){
        this.generales.mensajeError('No se ha seleccionado una imagen');
        return false;
      }
      if(this.generales.validarString(dato.propietario)){
        this.generales.mensajeError('No se ha ingresado el nombre del propietario de la cuenta');
        return false;
      }
      if(this.generales.validarString(dato.referencia)){
        this.generales.mensajeError('No se ha ingresado el numero de referencia');
        return false;
      }
      if(this.generales.validarEntero(dato.idBanco)){
        this.generales.mensajeError('No se ha seleccionado un banco');
        return false;
      }
      if(this.generales.validarEntero(dato.idCuenta)){
        this.generales.mensajeError('No se ha seleccionado una cuenta');
        return false;
      }
      if(this.generales.validarString(dato.fecha)){
        this.generales.mensajeError('No se ha seleccionado una fecha');
        return false;
      }
      if(dato.comision){
        if(this.generales.validarString(dato.cantidad)){
          this.generales.mensajeError('No se ha la cantidad de comision');
          return false;
        }
      }
    }
    return true;
  }

  validarDescuento(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarString(dato.cantidad)){
      this.generales.mensajeError('No se ha seleccionado una cantidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idTipo)){
      this.generales.mensajeError('No se ha seleccionado un tipo de descuento');
      return false;
    }
    if(dato.idTipo.toString() === '2' && this.generales.validarEntero(dato.idMonto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    return true;
  }

  validarDevolucion(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha seleccionado una monto');
      return false;
    }
    if(this.generales.validarEntero(dato.idFormaPago)){
      this.generales.mensajeError('No se ha seleccionado una forma de pago');
      return false;
    }
    if(parseInt(dato.idFormaPago.toString().toString()) > 1 && this.generales.validarEntero(dato.idBanco)){
      this.generales.mensajeError('No se ha seleccionado un banco');
      return false;
    }
    return true;
  }

  validarExtra(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha seleccionado una monto');
      return false;
    }
    return true;
  }
}
