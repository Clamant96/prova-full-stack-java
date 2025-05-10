import { EnderecoService } from './../../../service/endereco.service';
import { Endereco } from './../../../model/Endereco';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../model/Page';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.css'
})
export class EnderecosComponent implements OnChanges {

  @Input() atualizar: boolean = false;

  @Output() enviaIdEndereco = new EventEmitter<number>();

  public id: number = 0;

  public enderecos: Endereco[] = [];

  public totalElements: number = 0;
  public last: boolean = false;
  public first: boolean = false;
  public page: number = 0;
  public size: number = 3;
  public sortBy: string = '';
  public direction: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['atualizar']) {
      console.log('atualizar mudou:', changes['atualizar'].currentValue);

      this.totalElements = 0;
      this.last = false;
      this.first = false;
      this.page = 0;
      this.size = 3;
      this.sortBy = '';
      this.direction = '';

      this.getAllByUsuarioId(this.id);

    }

  }

  constructor(
    private route: ActivatedRoute,
    private enderecoService: EnderecoService,
    private router: Router,
  ) {}

  ngOnInit() {
    if(environment.token == "") {
      this.router.navigate(['/login']);
    }

    this.id = this.route.snapshot.params['id'];

    if(this.id > 0) {
      this.getAllByUsuarioId(this.id);
    }else {
      this.size = 10;
      this.getAll();
    }

  }

  enviaIdEnderecoOutput(id: number) {
    if(this.id > 0) {
      this.enviaIdEndereco.emit(id);
    }

  }

  getAllByUsuarioId(id: number) {
    if(id > 0) {
      this.enderecoService.getAllByUsuarioId(
        id,
        this.page,
        this.size,
        this.sortBy,
        this.direction
      ).subscribe((resp: Page) => {
        this.enderecos = resp.content;

        this.totalElements = resp.totalElements;
        this.last = resp.last;
        this.first  = resp.first;

      });
    }
  }

  getAll() {
    this.enderecoService.getAll(
      this.page,
      this.size,
      this.sortBy,
      this.direction
    ).subscribe((resp: Page) => {
      this.enderecos = resp.content;

      this.totalElements = resp.totalElements;
      this.last = resp.last;
      this.first  = resp.first;

    });
  }

  formatarData(data: Date): string {
    const dataCorreta = new Date(data);

    if (!(dataCorreta instanceof Date) || isNaN(dataCorreta.getTime())) {
      return 'Data inválida';
    }

    const dia = String(dataCorreta.getUTCDate()).padStart(2, '0');
    const mes = String(dataCorreta.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataCorreta.getUTCFullYear();
    const horas = String(dataCorreta.getUTCHours()).padStart(2, '0');
    const minutos = String(dataCorreta.getUTCMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  retroceder() {
    if(!this.first) {
      this.page = (this.page - 1) >= 0 ? this.page - 1 : this.page;

      this.getAllByUsuarioId(this.id);

    }
  }

  avancar() {
    if(!this.last) {
      this.page = (this.page + 1) <= this.totalElements ? this.page + 1 : this.page;

      this.getAllByUsuarioId(this.id);

    }
  }

}
