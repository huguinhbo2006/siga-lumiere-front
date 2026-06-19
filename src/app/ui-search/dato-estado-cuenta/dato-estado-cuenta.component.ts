import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dato-estado-cuenta',
  templateUrl: './dato-estado-cuenta.component.html',
  styleUrl: './dato-estado-cuenta.component.css'
})
export class DatoEstadoCuentaComponent {
  @Input() dato: any;
  @Output() confirmar = new EventEmitter();

    abierto = false;

    toggle(): void {
        this.abierto = !this.abierto;
    }

    coincideMonto(ingreso: any): boolean {
        return Number(this.dato?.monto) === Number(ingreso?.monto);
    }

    coincideReferencia(ingreso: any): boolean {
        return String(this.dato?.numeroReferencia || '').trim()
            === String(ingreso?.numeroReferencia || '').trim();
    }

    coincideFecha(ingreso: any): boolean {
        return String(this.dato?.fecha || '').trim()
            === String(ingreso?.fecha || '').trim();
    }

    coincideConcepto(ingreso: any): boolean {

      const csvConcepto = this.normalizarTexto(
          this.dato?.concepto
      );
  
      const ingresoConcepto = this.normalizarTexto(
          ingreso?.concepto
      );
  
      return (
          csvConcepto.includes(ingresoConcepto) ||
          ingresoConcepto.includes(csvConcepto)
      );
  }

    private normalizarTexto(texto: string): string {

      return String(texto || '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim();
  }

    getBadgeClass(porcentaje: number): string {

        if (porcentaje >= 90) {
            return 'bg-success';
        }

        if (porcentaje >= 70) {
            return 'bg-warning';
        }

        return 'bg-danger';
    }

    confirmarIngreso(ingreso: any): void {

        this.confirmar.emit({
            id: ingreso.id,
            ingreso,
            dato: this.dato
        });
    
    }
}
