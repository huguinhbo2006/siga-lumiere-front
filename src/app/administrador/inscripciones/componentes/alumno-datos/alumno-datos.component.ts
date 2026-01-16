import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import swal from'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-datos',
  templateUrl: './alumno-datos.component.html',
  styleUrl: './alumno-datos.component.css'
})
export class AlumnoDatosComponent {
  @Input() datos = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    celular: '',
    telefono: '',
    correo: '',
    idSexo: 0,
    fechaNacimiento: ''
  }
  @Input() listas = {
    sexos: []
  }
  @Input() codigos: any;
  posibles: any;
  @Output() emitidor = new EventEmitter<any>();
  @Output() existe = new EventEmitter<any>();
  constructor(private generales: GeneralesService, private router: Router){}

  ngOnInit(): void {
  }

  emitir(){
    let codigo = this.datos.nombre.substring(0,2);
    codigo = codigo + this.datos.apellidoPaterno.substring(0,2);
    codigo = codigo + this.datos.apellidoMaterno.substring(0,2);
    codigo = codigo + this.datos.fechaNacimiento.replaceAll('-', '');
    
    this.posibles = this.generales.registros(this.codigos, codigo, 'codigo');
    if(this.posibles.length > 0){
      var alumnos: any = {};
      alumnos[0] = 'Selecciona una respuesta';
      this.posibles.forEach((dato: any) => {
        alumnos[dato.id] = dato.nombre + ' ' + dato.apellidoPaterno + ' ' + dato.apellidoMaterno;
      });
      swal.fire({
        title: 'Ya existe un alumno con el mismo codigo.\n Verifica que no este en la lista.',
        input: 'select',
        inputOptions: {
          alumnos
        },
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
          this.router.navigate(['admin/alumno', result.value]);
          this.generales.cerrarModal();
        }else{
          this.emitidor.emit(this.datos);
        }
      });
    }else{
      this.emitidor.emit(this.datos);
    }
  }
}
