import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private http = inject(HttpClient);
  private generales = inject(GeneralesService);

  // Tus headers estándar con el Token
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + localStorage.getItem('token')
  });

  uri = environment.url + 'prestamos/';

  mostrar() {
    return this.http.get(this.uri + 'mostrar', { headers: this.headers });
  }

  nuevo(body: any) {
    return this.http.post(this.uri + 'nuevo', body, { headers: this.headers });
  }

  traer(body: any) {
    return this.http.post(this.uri + 'traer', body, { headers: this.headers });
  }

  abono(body: any) {
    return this.http.post(this.uri + 'abono', body, { headers: this.headers });
  }

  validar(dato: any): boolean {
    if (this.generales.validarEntero(dato.idEmpleado)) {
      this.generales.mensajeError('No se ha seleccionado el empleado');
      return false;
    }
    if (this.generales.validarEntero(dato.idFormaPago)) {
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
      return false;
    }
    if (this.generales.validarEntero(dato.idCuenta) && dato.idFormaPago > 1) {
      this.generales.mensajeError('No se ha seleccionado la cuenta');
      return false;
    }
    if (!dato.monto || dato.monto <= 0) {
      this.generales.mensajeError('El monto debe ser mayor a 0');
      return false;
    }
    return true;
  }
}