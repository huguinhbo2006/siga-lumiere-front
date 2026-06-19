import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-egresos-directivos',
  templateUrl: './egresos-directivos.component.html',
  styleUrl: './egresos-directivos.component.css'
})
export class EgresosDirectivosComponent {
  configuracion: datatableConfig = {
    alias: ['Nivel', 'Calendario', 'Folio', 'Fecha', 'Rubro', 'Tipo', 'Concepto', 'Pago', 'Cuenta', 'Monto'],
    encabezados: ['nivel', 'calendario', 'folio', 'fechaFormato', 'rubro', 'tipo', 'concepto', 'forma', 'cuenta', 'monto'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  search = false;
  busqueda = {
    idCalendario: 0,
    idRubro: 0,
    idTipo: 0,
    idSucursal: 0,
    idFormaPago: 0,
    referencia: 0,
    idNivel: 0,
    dias: ''
  };
  listas = {
    calendarios: [],
    rubros: [],
    tipos: [],
    sucursales: [],
    formas: [],
    niveles: [],
    cuentas: []
  }
  imagen: any;
  constructor(private generales: GeneralesService, private servicio: EgresosService, private pdf: PdfService){}
  
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
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Egreso agregado correctamente');
        this.generales.cerrarModal();
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.pdf.pdfEgreso(respuesta.id);
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Egreso modificado correctamente');
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
      this.generales.mensajeCorrecto('Egreso eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
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
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  imprimir(){
    this.pdf.pdfEgreso(this.seleccion.id);
  }

  voucher(imagen: any){
    const body = {
      id: this.seleccion.id,
      imagen: imagen
    }
    this.cargando = true;
    this.servicio.actualizarVoucher(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Voucher cargado correctamente');
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  verImagen(){
    this.cargando = true;
    this.servicio.traerVoucher(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.imagen = respuesta;
      this.modal('imagen');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  fecha(dato: any){
    const body = {
      id: this.seleccion.id,
      fecha: dato
    }
    this.cargando = true;
    this.servicio.actualizarFecha(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Fecha actualizada correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
