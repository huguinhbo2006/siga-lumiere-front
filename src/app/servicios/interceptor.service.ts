import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators'; // 👈 Añadimos catchError
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private generales: GeneralesService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.generales.mostrarCargando();

    const method = req.method;
    const url = req.url;
    const body = req.body || {};
    const headers = req.headers;

    if (method.toString() === 'POST') {
      body.log = localStorage.getItem('usuario');
      body.usuarioID = localStorage.getItem('identificador');
      body.sucursalID = localStorage.getItem('sucursal');
      body.calendarioID = localStorage.getItem('calendario');
    }

    req = req.clone({ method, url, body, headers });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 1. En automático ejecuta tu lógica de interpretación de errores
        this.generales.interpretarError(error);
        
        // 2. Retornamos el error para que, si un componente específico 
        // necesita saber que falló por algo extra, pueda hacerlo.
        return throwError(() => error);
      }),
      finalize(() => this.generales.ocultarCargando())
    );
  }
}