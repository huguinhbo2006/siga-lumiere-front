import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';
import { Pregunta } from '../interfaces/pregunta.interface';

@Injectable({
  providedIn: 'root'
})
export class AplicacionQuizesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + 'A7bF2qLm9ZpXc4Wv3rTg5NnYjHk8sQdE1uR0tVoPwMiBlGySaDz'
  });
  uri = environment.urlQuizes + 'quizes/';
  
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

  preguntas(body: any){
    const url = this.uri + 'preguntas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }  

  validarPregunta(p: Pregunta): boolean {
  // Revisamos que los campos obligatorios no estén vacíos o nulos
  if (!p.indice && p.indice !== 0) return false;
  if (!p.pregunta || p.pregunta.trim() === '') return false;
  if (!p.respuestaA || p.respuestaA.trim() === '') return false;
  if (!p.respuestaB || p.respuestaB.trim() === '') return false;
  if (!p.respuestaC || p.respuestaC.trim() === '') return false;
  if (!p.respuestaD || p.respuestaD.trim() === '') return false;
  if (!p.correcta || p.correcta.trim() === '') return false;

  // Todas las validaciones pasaron
  return true;
}

  validar(dato: any){
    /*if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }*/
    return true;
  }
}
