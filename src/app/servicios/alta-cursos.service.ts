import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class AltaCursosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url + 'altacursos/';
  
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
  
  validar(dato: any){
    if(this.generales.validarEntero(dato.idNivel)){
      this.generales.mensajeError('No se ha seleccionado el nivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idSubnivel)){
      this.generales.mensajeError('No se ha seleccionado el subnivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idCurso)){
      this.generales.mensajeError('No se ha seleccionado el curso');
      return false;
    }
    if(this.generales.validarEntero(dato.idModalidad)){
      this.generales.mensajeError('No se ha seleccionado la modalidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCategoria)){
      this.generales.mensajeError('No se ha seleccionado la categoria');
      return false;
    }
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idSede)){
      this.generales.mensajeError('No se ha seleccionado la sede');
      return false;
    }
    if(this.generales.validarString(dato.precio)){
      this.generales.mensajeError('No se ha ingresado el precio');
      return false;
    }
    if(this.generales.validarString(dato.inicio)){
      this.generales.mensajeError('No se ha ingresado la fecha de inicio');
      return false;
    }
    if(this.generales.validarString(dato.fin)){
      this.generales.mensajeError('No se ha ingresado la fecha de fin');
      return false;
    }
    if(this.generales.validarString(dato.limitePago)){
      this.generales.mensajeError('No se ha ingresado la fecha de limite de pago');
      return false;
    }
    return true;
  }
}