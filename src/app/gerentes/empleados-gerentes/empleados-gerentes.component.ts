import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EmpleadosService } from '../../servicios/empleados.service';

@Component({
  selector: 'app-empleados-gerentes',
  templateUrl: './empleados-gerentes.component.html',
  styleUrl: './empleados-gerentes.component.css'
})
export class EmpleadosGerentesComponent {
  configuracion: datatableConfig = {
      alias: ['Nombre', 'Telefono', 'Celular', 'Sucursal', 'Departamento', 'Puesto'],
      encabezados: ['nombre', 'telefono', 'celular', 'sucursal', 'departamento', 'puesto'],
      busqueda: true
    };
    datos: any;
    cargando = false;
    seleccion: any;
    vista: any;
    constructor(private generales: GeneralesService, private servicio: EmpleadosService){}
    
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
      this.servicio.mostrar().subscribe((respuesta: any) => {
        this.cargando = false;
        this.datos = respuesta;
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
    
    modificar(dato: any){
      dato.id = this.seleccion.id;
      this.cargando = true;
      this.servicio.imagenes(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Empleado modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
}
