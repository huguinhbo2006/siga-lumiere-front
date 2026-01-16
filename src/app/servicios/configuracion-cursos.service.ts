import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionCursosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'configuracioncursos/';
  
    mostrar(body: any) {
      const url = this.uri + 'mostrar';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
  
    nuevo(body: any) {
      const url = this.uri + 'nuevo';
      return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
    }
}
