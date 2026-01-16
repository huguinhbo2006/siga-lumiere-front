import { Component, EventEmitter, Output } from '@angular/core';
import * as mammoth from 'mammoth';

@Component({
  selector: 'app-word-texto',
  templateUrl: './word-texto.component.html',
  styleUrl: './word-texto.component.css'
})
export class WordTextoComponent {
  texto = '';
  @Output() emitir = new EventEmitter();
  constructor(){}

  leerWord(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;

      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        this.texto = result.value; // aquí está el texto plano
        this.emitir.emit(this.texto);
      } catch (err) {
        console.error("Error leyendo el Word:", err);
      }
    };

    reader.readAsArrayBuffer(file);
  }
}
