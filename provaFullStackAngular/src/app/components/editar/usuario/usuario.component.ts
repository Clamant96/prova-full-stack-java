import { Component, Input } from '@angular/core';
import { Usuario } from '../../../model/Usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnderecosComponent } from '../../lista/enderecos/enderecos.component';
import { environment } from '../../../../environments/environment';
import { EnderecoComponent } from '../../endereco/endereco.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule, EnderecosComponent, EnderecoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  @Input() id: number = 0;

  public usuario: Usuario = new Usuario();

  public atualizarStatus: boolean = false;
  public isAdicionar: boolean = false;
  public idEmpresa: number = 0;

  public roles: any[] = ['ADMIN', 'USER']

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    if(environment.token == "") {
      this.router.navigate(['/login']);
    }

    this.usuario.nome = '';
    this.usuario.email = '';
    this.usuario.role = '';
    this.usuario.senha = '';

    this.id = this.route.snapshot.params['id'];

    this.getByIdUsuario(this.id);

  }

  handleTipoDeContato(event: any) {
    this.usuario.role = event.target.value;

  }

  getByIdUsuario(id: number) {
    if(id > 0) {
      this.usuarioService.getById(id).subscribe((resp: Usuario) => {
        this.usuario = resp;
      });
    }

  }

  atualizar() {
    this.usuario.enderecos = [];

    const user: any = {
      "id": this.usuario.id,
      "nome": this.usuario.nome,
      "email": this.usuario.email,
      "senha": this.usuario.senha,
      "role": this.usuario.role
    }

    this.usuarioService.atualizarUsuario(user).subscribe((resp: Usuario) => {
      this.router.navigate(['/login']);

    }, err => {
      console.warn('Ocorreu um erro com o cadastro.');
    });
  }

  capiturarAtualizacaoEndereco(event: any) {
    this.atualizarStatus = !this.atualizarStatus;
    this.isAdicionar = false;

  }

  capituraIdEndereco(event: any) {
    this.idEmpresa = event;

    this.adicionar();

  }

  adicionar() {
    this.isAdicionar = !this.isAdicionar;
  }

}
