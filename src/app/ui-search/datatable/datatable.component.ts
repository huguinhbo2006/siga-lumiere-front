import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';

declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit, OnChanges {
  @Output() emitidor = new EventEmitter<any>();
  @Output() doble = new EventEmitter<any>();
  
  @Input() configuracion: datatableConfig = {
    alias: [''],
    encabezados: ['']
  };
  @Input() datos: any[] = [];

  listado: any[] = [];
  indiceOrden: number | undefined;
  ordenASC = false;
  
  numeros = [
    { id: 5, nombre: 5},
    { id: 10, nombre: 10},
    { id: 25, nombre: 25},
    { id: 50, nombre: 50},
    { id: 0, nombre: 'All'}
  ];
  
  numeroFilas = 5;
  numeroPaginas = 0;
  paginaSeleccionada = 1;
  respaldo: any[] = [];
  totalDatos = 0;

  constructor() {}

  ngOnInit(): void {
    this.configuracion.ordenFilas = (this.configuracion.ordenFilas === undefined) ? true : this.configuracion.ordenFilas;
    this.configuracion.busqueda = (this.configuracion.busqueda === undefined) ? true : this.configuracion.busqueda;
    if (this.datos && this.datos.length > 0) {
      this.configurar();
    }
  }

  toExcel() {
    exportCSVFile(null, this.datos, 'Prueba');
  }

  esIcono(icono: any): boolean {
    if (icono === null || icono === undefined) return false;
    const str = icono.toString();
    return str.includes('fas fa') || str.includes('fab fa');
  }

  esColor(color: any): boolean {
    if (color === null || color === undefined) return false;
    return color.toString().includes('text-');
  }

  esHay(item: any): boolean {
    if (item === null || item === undefined) return false;
    return item.toString().includes('hay');
  }

  configurar() {
    if (this.configuracion.numeroFilas !== undefined) {
      this.numeros = this.configuracion.numeroFilas.map((numero: any) => ({ id: numero, nombre: numero }));
      this.numeroFilas = this.configuracion.numeroFilas[0];
    }
    this.configurarPaginacion();
  }

  configurarPaginacion() {
    const total = this.datos ? this.datos.length : 0;
    this.numeroFilas = (this.numeroFilas.toString() === '0') ? total : Number(this.numeroFilas);
    this.numeroPaginas = total > 0 ? Math.ceil(total / this.numeroFilas) : 0;
    if (this.numeroPaginas < this.paginaSeleccionada) {
      this.paginaSeleccionada = 1;
    }
    this.paginacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos']) {
      const valor = changes['datos'].currentValue;
      const arr = Array.isArray(valor) ? valor : [];
      this.datos = [...arr];
      this.respaldo = [...arr];
      this.listado = [...arr];
      this.indiceOrden = undefined;
      this.ordenASC = false;
      this.configurarPaginacion();
      this.totalDatos = this.datos.length;
    }
  }

  mostrar(item: any, indice: number) {
    const estado_actual = !item.seleccionado;

    if (!this.configuracion.multiseleccion) {
      this.datos.forEach((elemento: any) => {
        elemento.seleccionado = (elemento === item) ? estado_actual : false;
      });
      
      if (estado_actual) {
        item.POSICION = indice;
      }
      this.emitidor.emit(estado_actual ? item : undefined);
    } else {
      item.seleccionado = estado_actual;
      if (estado_actual) {
        item.POSICION = indice;
      }
      const seleccionados = this.datos.filter((elemento: any) => elemento.seleccionado);
      this.emitidor.emit(seleccionados);
    }
  }

  dobleClick(item: any) {
    this.doble.emit(item);
  }

  buscar(busqueda: any) {
    const termino = busqueda ? busqueda.toString().toLowerCase().trim() : '';
    if (termino.length > 0) {
      this.datos = this.respaldo.filter((elemento: any) => {
        return this.configuracion.encabezados.some((encabezado: any) => {
          const valor = elemento[encabezado];
          if (valor !== undefined && valor !== null) {
            return valor.toString().toLowerCase().includes(termino);
          }
          return false;
        });
      });
    } else {
      this.datos = [...this.respaldo];
    }
    this.configurarPaginacion();
  }

  ordenar(indice: any) {
    if (this.datos && this.datos.length > 0) {
      this.indiceOrden = indice;
      this.ordenASC = !this.ordenASC;
      this.aplicarOrden(indice);
    }
  }

  reordenar() {
    if (this.listado && this.listado.length > 0 && this.indiceOrden !== undefined) {
      this.aplicarOrden(this.indiceOrden);
    }
  }

  aplicarOrden(indice: any) {
    const campo = this.configuracion.encabezados[indice];
    this.datos.sort((a: any, b: any) => {
      let valA = a[campo];
      let valB = b[campo];

      if (valA === null || valA === undefined) valA = '';
      if (valB === null || valB === undefined) valB = '';

      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB) && valA !== '' && valB !== '') {
        return this.ordenASC ? numA - numB : numB - numA;
      }

      const strA = valA.toString().toLowerCase();
      const strB = valB.toString().toLowerCase();
      if (strA < strB) return this.ordenASC ? -1 : 1;
      if (strA > strB) return this.ordenASC ? 1 : -1;
      return 0;
    });
    this.paginacion();
  }

  paginacion() {
    if (this.datos !== undefined) {
      const inicio = (this.paginaSeleccionada - 1) * this.numeroFilas;
      const fin = inicio + Number(this.numeroFilas);
      this.listado = this.datos.slice(inicio, fin);
    }
  }
}
