import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-sucursales',
  templateUrl: './usuario-sucursales.component.html',
  styleUrl: './usuario-sucursales.component.css'
})
export class UsuarioSucursalesComponent {
  @Input()sucursales: any;
  @Input() seleccion = {
    nombre: '',
    id: 0
  };
  @Input() id:any;
  lista: any;
  entre = false;
  constructor(private generales: GeneralesService, private router: Router){
  }

  ngOnInit(){
    this.buscar();
  }

  buscar(){
    this.generales.delay(500).then(fun => {
      if(localStorage.getItem('entre')?.toString() === '1'){
        this.seleccionar(localStorage.getItem('sucursal'));
      }else{
        this.seleccionar(this.id);  
      }
    });
  }

  seleccionar(id: any){
    if(id === null || id === undefined || this.sucursales === undefined){
      this.buscar();
    }else{
      this.seleccion = this.generales.busquedaIdentificador(this.sucursales, id);
      this.lista = this.generales.restantes(this.sucursales, id);
      localStorage.setItem('sucursal', this.seleccion.id.toString());
      localStorage.setItem('nombreSucursal', this.seleccion.nombre);
      localStorage.setItem('entre', '1');
    }
    //this.router.navigate(['siga']);
  }
}
