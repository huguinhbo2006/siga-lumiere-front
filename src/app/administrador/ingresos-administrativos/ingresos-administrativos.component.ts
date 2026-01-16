import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { IngresosService } from '../../servicios/ingresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-ingresos-administrativos',
  templateUrl: './ingresos-administrativos.component.html',
  styleUrl: './ingresos-administrativos.component.css'
})
export class IngresosAdministrativosComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Nivel', 'Folio', 'Fecha y Hora', 'Rubro', 'Concepto', 'Forma de pago', 'Cuenta', 'Monto', 'Vocuher'],
    encabezados: ['calendario', 'nivel', 'folio', 'fecha', 'rubro', 'concepto', 'forma', 'cuenta', 'montoFormato', 'hayVoucher'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas: any;
  imagen: any;
  
  constructor(
    private generales: GeneralesService,
    private servicio: IngresosService,
    private pdf: PdfService
  ){}
  
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
  
  nuevo(dato: any){
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
  
  solicitar(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.solicitar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Solicitud de modificacion de ingreso creada correctamente');
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
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
