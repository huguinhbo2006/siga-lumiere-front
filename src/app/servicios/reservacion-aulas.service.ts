import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservacionAulasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'reservacionaulas/';
  
  mostrar(){
    const url = this.uri + 'mostrar';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  horarios(body: any){
    const url = this.uri + 'horarios';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  reservar(body: any){
    const url = this.uri + 'reservar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  listas(){
    const url = this.uri + 'listas';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  reservadas(body: any){
    const url = this.uri + 'reservadas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  liberar(body: any){
    const url = this.uri + 'liberar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarEntero(dato.idAula)){
      this.generales.mensajeError('No se seleccionado un aula');
      return false;
    }
    return true;
  }
}
