import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../model/Usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AlertaComponent } from '../util/alerta/alerta.component';
import { Alerta } from '../../model/Alerta';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, FormsModule, AlertaComponent],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {

  @ViewChild(AlertaComponent) alertaComponent!: AlertaComponent;

  public usuario: Usuario = new Usuario();

  public roles: any[] = ['ADMIN', 'USER']

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.usuario.nome = '';
    this.usuario.email = '';
    this.usuario.role = '';
    this.usuario.senha = '';

  }

  handleTipoDeContato(event: any) {
    this.usuario.role = event.target.value;

  }

  cadastrar() {
    if(this.usuario?.email == '' || this.usuario?.senha == '' || this.usuario?.nome == '' || this.usuario?.role == '') {
      let mensagem: string = `${this.usuario?.email == '' ? 'Email: NOK' : 'Email: OK'} | ${this.usuario?.senha == '' ? 'Senha: NOK' : 'Senha: OK'} | ${this.usuario?.nome == '' ? 'Nome: NOK' : 'Nome: OK'} | ${this.usuario?.role == '' ? 'Role: NOK' : 'Role: OK'}`
      this.setMensagem({
        titulo: 'Cadastro Usuario',
        mensagem: `Voce deve preencher todos os campos antes de cadastrar o usuario, dados validados: ${mensagem}`,
        tipo: ''
      });

    } else {
      this.usuarioService.cadastrarUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.router.navigate(['/login']);

      }, err => {
        this.setMensagem({
          titulo: 'Cadastro Usuario',
          mensagem: 'Ocorreu um erro ao tentar cadastrar o usuario.',
          tipo: 'erro'
        });

        console.warn('Ocorreu um erro com o cadastro.');
      });

    }

  }

  setMensagem(alerta: Alerta) {
    this.alertaComponent.setObjAlerta(alerta);
    this.alertaComponent.openModal();
  }

}
