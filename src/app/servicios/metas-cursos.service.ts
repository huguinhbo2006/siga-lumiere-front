import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetasCursosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'metascursos/';
  
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
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idNivel)){
      this.generales.mensajeError('No se ha seleccionado el nivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idSubnivel)){
      this.generales.mensajeError('No se ha seleccionado el subnivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idModalidad)){
      this.generales.mensajeError('No se ha seleccionado la modalidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCurso)){
      this.generales.mensajeError('No se ha seleccionado el curso');
      return false;
    }
    if(this.generales.validarEntero(dato.idSucursal)){
      this.generales.mensajeError('No se ha seleccionado la sucursal');
      return false;
    }
    if(this.generales.validarString(dato.meta)){
      this.generales.mensajeError('No se ha ingresado la meta');
      return false;
    }
    return true;
  }
}
