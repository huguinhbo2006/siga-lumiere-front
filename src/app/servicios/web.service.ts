import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'pagina/';
    
    paginas() {
      const url = this.uri + 'paginas';
      return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    traerConfiguracionPagina(body: any) {
      const url = this.uri + 'traerConfiguracionPagina';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    nuevaConfiguracionPagina(body: any) {
      const url = this.uri + 'nuevaConfiguracionPagina';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    eliminarConfiguracionPagina(body: any) {
      const url = this.uri + 'eliminarConfiguracionPagina';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }

    nuevoBanner(body: any){
      const url = this.uri + 'nuevoBanner';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    nuevo(body: any){
      const url = this.uri + 'nuevo';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    modificar(body: any){
      const url = this.uri + 'modificar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    eliminar(body: any) {
      const url = this.uri + 'eliminar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
    
    validar(dato: any){
      if(this.generales.validarString(dato.monto)){
        this.generales.mensajeError('No se ha ingresado el nombre');
        return false;
      }
      if(this.generales.validarEntero(dato.idCalendario)){
        this.generales.mensajeError('No se ha seleccionado un calendario');
        return false;
      }
      if(this.generales.validarString(dato.idNivel)){
        this.generales.mensajeError('No se ha seleccionado un nivel');
        return false;
      }
      return true;
    }
}
