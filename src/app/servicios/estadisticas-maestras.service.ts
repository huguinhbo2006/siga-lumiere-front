import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasMaestrasService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'estadisticasMaestras/';

  id(body: any) {
    const url = this.uri + 'id';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  datos(body: any) {
    const url = this.uri + 'datos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  alumnos(body: any) {
    const url = this.uri + 'alumnos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  escolares(body: any) {
    const url = this.uri + 'escolares';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  publicitarios(body: any) {
    const url = this.uri + 'publicitarios';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  cuenta(body: any) {
    const url = this.uri + 'cuenta';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
}
