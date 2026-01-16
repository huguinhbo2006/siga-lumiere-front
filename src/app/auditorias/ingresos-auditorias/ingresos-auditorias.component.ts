import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AuditoriasService } from '../../servicios/auditorias.service';

@Component({
  selector: 'app-ingresos-auditorias',
  templateUrl: './ingresos-auditorias.component.html',
  styleUrl: './ingresos-auditorias.component.css'
})
export class IngresosAuditoriasComponent {
  configuracion: datatableConfig = {
    alias: ['Fecha', 'Folio', 'Forma Pago', 'Cuenta', 'Banco', 'Voucher', 'Activo', 'Monto', 'Ficha'],
    encabezados: ['fecha', 'folio', 'forma', 'cuenta', 'banco', 'voucher', 'activo', 'monto', 'ficha'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  busqueda = {
    idCalendario: 0,
    idSucursal: 0,
    idCuenta: 0,
    idFormaPago: 0
  }
  listas = {
    calendarios: [],
    sucursales: [],
    bancos: [],
    cuentas: [],
    formas: []
  }
  opciones = [
    { id: 2, nombre: 'Desauditado'},
    { id: 1, nombre: 'Auditado'},
    { id: 3, nombre: 'Problema'},
  ]
  opcion: any;
  vista = '';
  imagen = '';
  constructor(private generales: GeneralesService, private servicio: AuditoriasService){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.listas().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  buscar(){
    this.cargando = true;
    this.servicio.ingresos(this.busqueda).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  estado(){
    switch(this.opcion){
      case '2':
        this.desauditar();
        break;
      case '1':
        this.auditar();
        break;
      case '3':
        this.problemas();
        break;

    }
  }

  auditar(){
    this.cargando = true;
    this.servicio.auditarIngreso(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos.forEach((elemento: any) => {
        if(elemento.id.toString() === respuesta.id.toString()){
          elemento.auditado = 1;
          elemento.bg = 'bg-verde';
        }
      });
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  desauditar(){
    this.cargando = true;
    this.servicio.desauditarIngreso(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos.forEach((elemento: any) => {
        if(elemento.id.toString() === respuesta.id.toString()){
          elemento.auditado = 2;
          elemento.bg = '';
        }
      });
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  problemas(){
    this.cargando = true;
    this.servicio.problemaIngreso(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos.forEach((elemento: any) => {
        if(elemento.id.toString() === respuesta.id.toString()){
          elemento.auditado = 3;
          elemento.bg = '';
        }
      });
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  financieros(datos: any){
    this.cargando = true;
    this.servicio.financierosIngreso(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.buscar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  observaciones(datos: any){
    this.cargando = true;
    this.servicio.observacionesIngreso(datos).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.buscar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  voucher(){
    this.cargando = true;
    this.servicio.voucherIngreso(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.imagen = respuesta;
      this.modal('voucher');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
