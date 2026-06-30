import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private generales = inject(GeneralesService);
  private login = inject(LoginService);
  private router = inject(Router);

  usuario = '';
  password = '';
  logo = ''; // <-- Variable para el logo

  ngOnInit(): void {
    localStorage.clear();
    // Asignamos el logo desde tu servicio (ya sea el path de assets o el base64)
    this.logo = this.generales.logo || './../../../assets/img/default.png';
  }

  getToken() {
    if (!this.usuario || !this.password) {
      this.generales.mensajeError('Por favor, llena todos los campos');
      return;
    }

    this.login.getToken(this.usuario, this.password).subscribe((respuesta: any) => {
      localStorage.setItem('token', respuesta['token']);
      localStorage.setItem('usuario', this.usuario);
      this.router.navigate(['admin']);
    });
  }
}