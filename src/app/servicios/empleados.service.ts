import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'empleados/';
  
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
  
  activar(body: any){
    const url = this.uri + 'activar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  desactivar(body: any){
    const url = this.uri + 'desactivar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  imagenes(body: any){
    const url = this.uri + 'imagenes';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  sucursales(body: any){
    const url = this.uri + 'sucursales';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  agergarSucursal(body: any) {
    const url = this.uri + 'agregarSucursal';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  eliminarSucursal(body: any) {
    const url = this.uri + 'eliminarSucursal';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
  
  validar(dato: any): boolean {
    // ==========================================
    // 1. VALIDACIÓN: DATOS PERSONALES (Paso 0)
    // ==========================================
    if (this.generales.validarString(dato.personales.nombre)) {
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if (this.generales.validarString(dato.personales.estadoCivil)) {
      this.generales.mensajeError('Seleccione el estado civil');
      return false;
    }
    if (this.generales.validarString(dato.personales.fechaNacimiento)) {
      this.generales.mensajeError('No se ha ingresado la fecha de nacimiento');
      return false;
    }
    if (this.generales.validarString(dato.personales.celular)) {
      this.generales.mensajeError('Debe ingresar al menos un teléfono o celular');
      return false;
    }
  
    // ==========================================
    // 2. VALIDACIÓN: DOMICILIO (Paso 1)
    // ==========================================
    if (this.generales.validarString(dato.domicilio.calle)) {
      this.generales.mensajeError('No se ha ingresado la calle');
      return false;
    }
    if (this.generales.validarString(dato.domicilio.numeroExterior)) {
      this.generales.mensajeError('No se ha ingresado el número exterior');
      return false;
    }
    if (this.generales.validarString(dato.domicilio.colonia)) {
      this.generales.mensajeError('No se ha ingresado la colonia');
      return false;
    }
    // Selectores (Usando validarEntero para IDs)
    if (this.generales.validarEntero(dato.domicilio.idEstado)) {
      this.generales.mensajeError('Seleccione un estado válido');
      return false;
    }
    if (this.generales.validarEntero(dato.domicilio.idMunicipio)) {
      this.generales.mensajeError('Seleccione un municipio válido');
      return false;
    }
    if (this.generales.validarString(dato.domicilio.codigoPostal)) {
      this.generales.mensajeError('No se ha ingresado el código postal');
      return false;
    }
  
    // ==========================================
    // 3. VALIDACIÓN: DATOS FISCALES (Paso 2)
    // ==========================================
    if (this.generales.validarString(dato.fiscales.rfc)) {
      this.generales.mensajeError('No se ha ingresado el RFC');
      return false;
    }
    if (this.generales.validarString(dato.fiscales.curp)) {
      this.generales.mensajeError('No se ha ingresado la CURP');
      return false;
    }
    if (this.generales.validarString(dato.fiscales.nss)) {
      this.generales.mensajeError('No se ha ingresado el Número de Seguridad Social (NSS)');
      return false;
    }
  
    // ==========================================
    // 4. VALIDACIÓN: DATOS DE LA EMPRESA (Paso 3)
    // ==========================================
    if (this.generales.validarString(dato.empresa.sueldoBase)) {
      this.generales.mensajeError('No se ha ingresado el sueldo base');
      return false;
    }
    // Selectores de la empresa
    if (this.generales.validarEntero(dato.empresa.idSucursal)) {
      this.generales.mensajeError('Seleccione una sucursal');
      return false;
    }
    if (this.generales.validarEntero(dato.empresa.idDepartamento)) {
      this.generales.mensajeError('Seleccione un departamento');
      return false;
    }
    if (this.generales.validarEntero(dato.empresa.idPuesto)) {
      this.generales.mensajeError('Seleccione un puesto');
      return false;
    }
  
    return true;
  }
}
