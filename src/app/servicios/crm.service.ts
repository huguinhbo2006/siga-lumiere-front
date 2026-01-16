import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CRMService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'crm/';

  nuevoProspecto(prospecto: any) {
    const url = this.uri + 'nuevoProspecto';
    return this.http.post(url, prospecto, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  modificarProspecto(prospecto: any) {
    const url = this.uri + 'modificarProspecto';
    return this.http.post(url, prospecto, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  eliminarProspecto(prospecto: any) {
    const url = this.uri + 'eliminarProspecto';
    return this.http.post(url, prospecto, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  mostrarProspectos() {
    const url = this.uri + 'mostrarProspectos';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerProspecto(prospecto: any) {
    const url = this.uri + 'traerProspecto';
    return this.http.post(url, prospecto, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  buscarProspecto(prospecto: any) {
    const url = this.uri + 'buscarProspecto';
    return this.http.post(url, prospecto, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  guardarSeguimiento(seguimiento: any) {
    const url = this.uri + 'guardarSeguimiento';
    return this.http.post(url, seguimiento, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  modificarSeguimiento(seguimiento: any) {
    const url = this.uri + 'modificarSeguimiento';
    return this.http.post(url, seguimiento, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerSeguimiento(idSeguimiento: any){
    const url = this.uri + 'traerSeguimiento';
    return this.http.post(url, {id:idSeguimiento}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  guardarDescripcionSeguimiento(seguimiento: any){
    const url = this.uri + 'guardarDescripcionSeguimiento';
    return this.http.post(url, seguimiento, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  modificarEstatusSeguimiento(seguimiento: any){
    const url = this.uri + 'modificarEstatusSeguimiento';
    return this.http.post(url, seguimiento, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  guardarCita(cita: any){
    const url = this.uri + 'guardarCita';
    return this.http.post(url, cita, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  modificarEstatusCita(cita: any){
    const url = this.uri + 'modificarEstatusCita';
    return this.http.post(url, cita, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  mostrarCitas(body: any) {
    const url = this.uri + 'mostrarCitas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  esVentas(body: any) {
    const url = this.uri + 'esVentas';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  buscarFicha(body: any) {
    const url = this.uri + 'buscarFicha';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  confirmarPassword(body: any){
    const url = this.uri + 'confirmarPassword';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  asignarFicha(body: any){
    const url = this.uri + 'asignarFicha';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  validarProspecto(prospecto: any){
    if(this.generales.validarString(prospecto.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre del prospecto');
      return false;
    }
    if(this.generales.validarString(prospecto.apellidoPaterno)){
      this.generales.mensajeError('No se ha ingresado el apellido paterno del prospecto');
      return false;
    }
    if(this.generales.validarString(prospecto.apellidoMaterno)){
      this.generales.mensajeError('No se ha ingresado el apellido materno del prospecto');
      return false;
    }
    if(this.generales.validarString(prospecto.celular)){
      this.generales.mensajeError('No se ha ingresado el celular del prospecto');
      return false;
    }
    return true;
  }

  validarSeguimiento(seguimiento: any){
    if(this.generales.validarEntero(seguimiento.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado el calendario');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idNivel)){
      this.generales.mensajeError('No se ha seleccionado el nivel');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idSubnivel)){
      this.generales.mensajeError('No se ha seleccionado el subnivel');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idCategoria)){
      this.generales.mensajeError('No se ha seleccionado la categoria');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idModalidad)){
      this.generales.mensajeError('No se ha seleccionado la modalidad');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idCurso)){
      this.generales.mensajeError('No se ha seleccionado el curso');
      return false;
    }
    if(this.generales.validarEntero(seguimiento.idMedioContacto)){
      this.generales.mensajeError('No se ha seleccionado el medio de contacto');
      return false;
    }
    return true;
  }

  validarSeguimientoDescripcion(seguimiento: any){
    if(this.generales.validarEntero(seguimiento.tipo)){
      return { validacion: false, mensaje: 'No se ha seleccionado un tipo de seguimiento'};
    }
    if(this.generales.validarString(seguimiento.comentario)){
      return { validacion: false, mensaje: 'No se ha ingresado el comentario del seguimiento'};
    }
    if(this.generales.validarString(seguimiento.fecha)){
      return { validacion: false, mensaje: 'No se ha ingresado la fecha del seguimiento'};
    }
    if(parseInt(seguimiento.tipo) === 1){
      if(this.generales.validarEntero(seguimiento.medio)){
        return { validacion: false, mensaje: 'No se ha seleccionado el medio de contacto del seguimiento'};
      }
    }else{
      if(this.generales.validarString(seguimiento.descuento)){
        return { validacion: false, mensaje: 'No se ha ingresado el descuento'};
      }
      if(this.generales.validarString(seguimiento.caducidad)){
        return { validacion: false, mensaje: 'No se ha ingresado la caducidad'};
      }
      if(this.generales.validarEntero(seguimiento.tipoDescuento)){
        return { validacion: false, mensaje: 'No se ha seleccionado el tipo de descuento'};
      }
      if(this.generales.validarEntero(seguimiento.conceptoDescuento)){
        return { validacion: false, mensaje: 'No se ha seleccionado el concepto del descuento'};
      }
      if(parseInt(seguimiento.tipoDescuento) === 1 && parseInt(seguimiento.descuento) > 100){
        return { validacion: false, mensaje: 'No puedes asignar un descuento mayor al 100%'};
      }
    }
    return { validacion: true, mensaje: 'Todo correcto'};
  }

  validarCita(cita: any){
    if(this.generales.validarString(cita.motivo)){
      return { validacion: false, mensaje: 'No se ha ingresado el motivo de la cita'};
    }
    if(this.generales.validarString(cita.fecha)){
      return { validacion: false, mensaje: 'No se ha ingresado la fecha'};
    }
    if(this.generales.validarEntero(cita.idSucursal)){
      return { validacion: false, mensaje: 'No se ha seleccionado una sucursal'};
    }
    return { validacion: true, mensaje: 'Todo correcto'};
  }
}
