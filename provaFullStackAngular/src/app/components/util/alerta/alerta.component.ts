import { Component, EventEmitter, Output } from '@angular/core';
import { Alerta } from '../../../model/Alerta';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {

  public alerta: Alerta = new Alerta();
  public isVisible: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  openModal() {
    this.isVisible = true;
    console.log('Abre modal');
  }

  closeModal() {
    this.isVisible = false;
    console.log('Fecha modal');

  }

  setObjAlerta(alerta: Alerta) {
    this.alerta = alerta;

  }

  gerenciaTipoMensagem(tipo: string) {
    if(tipo?.includes('sucesso')) {
      return 'img/icon/envio_OK.svg';
    } else if(tipo?.includes('erro')) {
      return 'img/icon/envio_NOK.svg';
    } else {
      return 'img/icon/envio_ALARME.svg';
    }
  }

}
