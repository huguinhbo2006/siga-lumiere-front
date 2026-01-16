import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentesPDFService {

  constructor() { }

  celdaUnCampo(color: any, fuente: any, negritas: any, size: any, texto: any){
    return [
        [
          { text: texto, style: "tableHeader", alignment: 'center', bold: negritas, fontSize: size, color: color}
        ]
    ];
  }
}
