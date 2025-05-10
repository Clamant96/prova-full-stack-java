import { Router } from '@angular/router';
import { UsuarioService } from './../../../service/usuario.service';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../model/Page';
import { Usuario } from '../../../model/Usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  public totalElements: number = 0;
  public last: boolean = false;
  public first: boolean = false;
  public page: number = 0;
  public size: number = 10;
  public sortBy: string = '';
  public direction: string = '';

  public usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit() {
    if(environment.token == "") {
      this.router.navigate(['/login']);
    }

    this.getAll();

  }

  getAll() {
    this.usuarioService.getAll(
      this.page,
      this.size,
      this.sortBy,
      this.direction
    ).subscribe((resp: Page) => {
      this.usuarios = resp.content;

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

  editarPerfil(id: number) {
    this.router.navigate(['/editar/usuario', id]);
  }

  retroceder() {
    if(!this.first) {
      this.page = (this.page - 1) >= 0 ? this.page - 1 : this.page;

      this.getAll();

    }
  }

  avancar() {
    if(!this.last) {
      this.page = (this.page + 1) <= this.totalElements ? this.page + 1 : this.page;

      this.getAll();

    }
  }

}
