import { Component, Input, ViewChild } from '@angular/core';
import { Usuario } from '../../../model/Usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnderecosComponent } from '../../lista/enderecos/enderecos.component';
import { environment } from '../../../../environments/environment';
import { EnderecoComponent } from '../../endereco/endereco.component';
import { AlertaComponent } from '../../util/alerta/alerta.component';
import { Alerta } from '../../../model/Alerta';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule, EnderecosComponent, EnderecoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  @ViewChild(AlertaComponent) alertaComponent!: AlertaComponent;

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

        this.usuario.senha = '';

      });
    }

  }

  atualizar() {
    if(this.usuario?.email == '' || this.usuario?.senha == '' || this.usuario?.nome == '' || this.usuario?.role == '') {
      let mensagem: string = `${this.usuario?.email == '' ? 'Email: NOK' : 'Email: OK'} | ${this.usuario?.senha == '' ? 'Senha: NOK' : 'Senha: OK'} | ${this.usuario?.nome == '' ? 'Nome: NOK' : 'Nome: OK'} | ${this.usuario?.role == '' ? 'Role: NOK' : 'Role: OK'}`
      this.setMensagem({
        titulo: 'Atualizar Usuario',
        mensagem: `Voce deve preencher todos os campos antes de atualizar o usuario, dados validados: ${mensagem}`,
        tipo: ''
      });

    } else {
      this.usuario.enderecos = [];

      const user: any = {
        "id": this.usuario.id,
        "nome": this.usuario.nome,
        "email": this.usuario.email,
        "senha": this.usuario.senha,
        "role": this.usuario.role
      }

      this.usuarioService.atualizarUsuario(user).subscribe((resp: Usuario) => {
        environment.id = 0;
        environment.nome = '';
        environment.email = '';
        environment.senha = '';
        environment.token = '';

        this.router.navigate(['/login']);

      }, err => {
        this.setMensagem({
          titulo: 'Atualizar Usuario',
          mensagem: 'Ocorreu um erro ao tentar atualizar o usuario.',
          tipo: 'erro'
        });

        console.warn('Ocorreu um erro com a atualizacao.');
      });

    }

  }

  capiturarAtualizacaoEndereco(event: any) {
    this.atualizarStatus = !this.atualizarStatus;
    this.isAdicionar = false;

  }

  capituraIdEndereco(event: any) {
    if(this.isAdicionar && this.idEmpresa != event) {

    }else {
      this.abrir();
    }

    this.idEmpresa = event;

  }

  abrir() {
    this.isAdicionar = !this.isAdicionar;
  }

  adicionar() {
    this.idEmpresa = 0;

    this.isAdicionar = !this.isAdicionar;
  }

  setMensagem(alerta: Alerta) {
    this.alertaComponent.setObjAlerta(alerta);
    this.alertaComponent.openModal();
  }

}
