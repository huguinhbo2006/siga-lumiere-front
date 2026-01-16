import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CRMService } from '../../servicios/crm.service';
import { Router } from '@angular/router';
import { datatableConfig } from '../../interfaces/tables.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.css'
})
export class CRMComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Celular', 'Empleado', 'Estatus'],
    encabezados: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'celular', 'empleado', 'estatus'],
    busqueda: true
  };
  
   datos: any;
  seleccion: any;
  vista = '';
  cargando = false;
  contenido = '';
  user = localStorage.getItem('usuario');
  usuario = localStorage.getItem('identificador');
  constructor(private generales: GeneralesService,
              private crm: CRMService,
              private router: Router) { }

  ngOnInit(): void {
    this.mostrar();
  }

  modal(vista: string) {
    this.generales.delay(200).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  mostrar() {
    this.seleccion = undefined;
    this.crm.mostrarProspectos().subscribe(respuesta => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  guardar(prospecto: any) {
    if(this.crm.validarProspecto(prospecto)){
      this.crm.nuevoProspecto(prospecto).subscribe((respuesta: any) => {
        if(respuesta.existo){
          this.cargando = false;
          swal.fire({
            title: 'Ya existe un prospecto con ese celular.\n¿Deseas ir a su expediente?',
            inputAttributes: {
              autocapitalize: 'on'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            icon: 'info',
            allowOutsideClick: () => !swal.isLoading()
          }).then((result) => {
            if(result.isConfirmed){
              this.router.navigate(['siga/prospecto', respuesta.id]);
              this.generales.cerrarModal();
            }
          });
        }else{
          this.generales.mensajeCorrecto('Prospecto agregado correctamente');
          this.mostrar();
          this.generales.cerrarModal();
          this.cargando = false;
        }
      },
      error => {
        this.generales.interpretarError(error);
        this.cargando = false;
      });
    }
  }

  seleccionarProspecto(prospecto: any) {
    this.router.navigate(['admin/prospecto', prospecto.id]);
  }

  modificar(prospecto: any) {
    if(this.crm.validarProspecto(prospecto)){
      this.crm.modificarProspecto(prospecto).subscribe(respuesta => {
        this.generales.mensajeCorrecto('Prospecto modificado correctamente');
        this.mostrar();
        this.cargando = false;
      },
      error => {
        this.generales.interpretarError(error);
        this.cargando = false;
      });
    }
  }

  buscar(busqueda: any) {
    this.crm.buscarProspecto({busqueda}).subscribe(respuesta => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  eliminar(){
    this.crm.eliminarProspecto(this.seleccion).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Prospecto agregado correctamente');
      this.mostrar();
      this.generales.cerrarModal();
      this.cargando = false;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
