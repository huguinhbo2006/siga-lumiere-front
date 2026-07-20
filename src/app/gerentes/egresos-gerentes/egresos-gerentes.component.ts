import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-egresos-gerentes',
  templateUrl: './egresos-gerentes.component.html',
  styleUrl: './egresos-gerentes.component.css'
})
export class EgresosGerentesComponent {
  configuracion: datatableConfig = {
      alias: ['Nivel', 'Calendario', 'Folio', 'Fecha', 'Rubro', 'Tipo', 'Concepto', 'Pago', 'Monto', 'Forma de pago'],
      encabezados: ['nivel', 'calendario', 'folio', 'fecha', 'rubro', 'tipo', 'concepto', 'pago', 'monto', 'forma'],
      busqueda: true
    };
    datos: any;
    cargando = false;
    seleccion: any;
    vista: any;
    search = false;
    busqueda = {
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
    exit = true;
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
}
