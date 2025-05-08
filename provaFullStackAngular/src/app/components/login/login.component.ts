import { UsuarioService } from './../../service/usuario.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../model/UserLogin';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public userLogin: UserLogin = new UserLogin();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  auth() {
    this.usuarioService.autenticarUsuario(this.userLogin).subscribe((resp: UserLogin) => {
      environment.id = resp.id;
      environment.nome = resp.nome;
      environment.email = resp.email;
      environment.senha = resp.senha;
      environment.token = resp.token;

      localStorage.setItem('token', resp.token);

      this.router.navigate(['/home']);

    }, err => {
      console.warn('Ocorreu um erro com o login, verifique o usuario ou senha.');
    });
  }

}
