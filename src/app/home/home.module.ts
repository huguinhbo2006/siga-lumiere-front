import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogosModule } from '../catalogos/catalogos.module';
import { DesarrolloModule } from '../desarrollo/desarrollo.module';
import { DirectivosModule } from '../directivos/directivos.module';
import { AdministradorModule } from '../administrador/administrador.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { ReportesModule } from '../reportes/reportes.module';
import { RecursosHumanosModule } from '../recursos-humanos/recursos-humanos.module';
import { VentasModule } from '../ventas/ventas.module';
import { GerentesModule } from '../gerentes/gerentes.module';
import { WebModule } from '../web/web.module';
import { PrincipalModule } from '../principal/principal.module';
import { LumiereSocialModule } from '../lumiere-social/lumiere-social.module';
import { AplicacionModule } from '../aplicacion/aplicacion.module';


@NgModule({
  declarations: [
    LoginComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiSearchModule,
    CatalogosModule,
    DesarrolloModule,
    DirectivosModule,
    AdministradorModule,
    AuditoriasModule,
    ReportesModule,
    RecursosHumanosModule,
    VentasModule,
    GerentesModule,
    WebModule,
    PrincipalModule,
    LumiereSocialModule,
    AplicacionModule
  ]
})
export class HomeModule { }
