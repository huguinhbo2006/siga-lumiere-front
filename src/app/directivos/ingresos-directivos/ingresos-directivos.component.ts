import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { IngresosService } from '../../servicios/ingresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-ingresos-directivos',
  templateUrl: './ingresos-directivos.component.html',
  styleUrl: './ingresos-directivos.component.css'
})
export class IngresosDirectivosComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Nivel', 'Folio', 'Fecha y Hora', 'Rubro', 'Concepto', 'Forma de pago', 'Cuenta', 'Monto', 'Vocuher'],
    encabezados: ['calendario', 'nivel', 'folio', 'fechaFormato', 'rubro', 'concepto', 'forma', 'cuenta', 'montoFormato', 'hayVoucher'],
    busqueda: true
  };
  listas = {
    rubros: [],
    tipos: [],
    calendarios: [],
    formas: [],
    metodos: [],
    niveles: [],
    cuentas: [],
    bancos: [],
    sucursales: [],
    ingresos: []
  }
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idTipo: 0,
    idRubro: 0,
    idMetodoPago: 0,
    idFormaPago: 0,
    idSucursal: 0,
    idReferencia: 0,
    dias: ''
  }
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  search = false;
  imagen: any;
  constructor(private generales: GeneralesService, private servicio: IngresosService, private pdf: PdfService){}
  
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
    this.servicio.mostrar({}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  gerentes(){
    this.cargando = true;
    this.servicio.gerentes(this.busqueda).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    dato.modificar = false;
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Ingreso agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
        this.pdf.pdfIngreso(respuesta.id);
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  modificar(dato: any){
    dato.modificar = true;
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Ingreso modificado correctamente');
        this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  eliminar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Ingreso eliminado correctamente');
      this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  buscar(){
    this.cargando = true;
    this.servicio.buscar(this.busqueda).subscribe((respuesta: any) => {
      this.datos = respuesta;
      this.cargando = false;
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  imprimir(){
    this.pdf.pdfIngreso(this.seleccion.id);
  }

  voucher(voucher: any){
    this.cargando = true;
    const body = {
      id: this.seleccion.id,
      imagen: voucher
    }
    this.servicio.cargar(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Voucher actualizado correctamente');
      this.generales.cerrarModal();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  verImagen(){
    this.servicio.voucher(this.seleccion).subscribe((respuesta: any) => {
      this.imagen = respuesta;
      this.cargando = false;
      this.modal('imagen');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
