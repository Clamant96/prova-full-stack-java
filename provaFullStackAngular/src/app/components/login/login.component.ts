import { UsuarioService } from './../../service/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../model/UserLogin';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AlertaComponent } from '../util/alerta/alerta.component';
import { Alerta } from '../../model/Alerta';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, AlertaComponent  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild(AlertaComponent) alertaComponent!: AlertaComponent;

  public userLogin: UserLogin = new UserLogin();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit() {

  }

  showModal() {
    this.alertaComponent.openModal();
  }

  auth() {

    if(this.userLogin?.email == '' || this.userLogin?.senha == '') {
      this.setMensagem({
        titulo: 'Login',
        mensagem: 'Preencha o login e senha antes de logar.',
        tipo: ''
      });

    } else {
      this.usuarioService.autenticarUsuario(this.userLogin).subscribe((resp: UserLogin) => {
        environment.id = resp.id;
        environment.nome = resp.nome;
        environment.email = resp.email;
        environment.senha = resp.senha;
        environment.token = resp.token;
        environment.role = resp.role;

        localStorage.setItem('token', resp.token);

        this.router.navigate(['/home']);

      }, err => {
        this.setMensagem({
          titulo: 'Login',
          mensagem: 'Ocorreu um erro com o login, verifique o usuario ou senha.',
          tipo: 'erro'
        });
        console.warn('Ocorreu um erro com o login, verifique o usuario ou senha.');
      });

    }

  }

  setMensagem(alerta: Alerta) {
    this.alertaComponent.setObjAlerta(alerta);
    this.alertaComponent.openModal();
  }

}
