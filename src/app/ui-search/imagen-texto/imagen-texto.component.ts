import { Component, EventEmitter, Output } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-imagen-texto',
  templateUrl: './imagen-texto.component.html',
  styleUrl: './imagen-texto.component.css'
})
export class ImagenTextoComponent {
  texto = '';
  @Output() emitir = new EventEmitter();
  constructor(){}

  async leer(): Promise<string> {
    const worker = await createWorker('spa'); // indicas idioma aquí
    try {
      const { data: { text } } = await worker.recognize(this.texto);
      this.emitir.emit(this.texto);
      return text;
    } finally {
      await worker.terminate();
    }
  }
}
