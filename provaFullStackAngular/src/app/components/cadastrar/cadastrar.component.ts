import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../model/Usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {

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
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe((resp: Usuario) => {
      this.router.navigate(['/login']);

    }, err => {
      console.warn('Ocorreu um erro com o cadastro.');
    });
  }

}
