import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'comisiones/';
  
  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  comisiones(body: any) {
    const url = this.uri + 'comisiones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  traer() {
    const url = this.uri + 'traer';
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

  eliminar(body: any) {
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idCurso)){
      this.generales.mensajeError('No se ha seleccionado el curso');
      return false;
    }
    if(this.generales.validarEntero(dato.tipo)){
      this.generales.mensajeError('No se ha seleccionado el tipo de comision');
      return false;
    }
    if(this.generales.validarString(dato.comision)){
      this.generales.mensajeError('No se ha ingresado la comision');
      return false;
    }
    return true;
  }
}
