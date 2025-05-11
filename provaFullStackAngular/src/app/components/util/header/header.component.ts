import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public id: number = environment.id;
  public role: string = environment.role;

  constructor(
    private router: Router,
  ){}

  validaRole(role: string) {
    return role.includes('ADMIN');
  }

  logout() {
    environment.id = 0;
    environment.nome = '';
    environment.email = '';
    environment.senha = '';
    environment.token = '';
    environment.role = '';

    localStorage.setItem('token', '');

    this.router.navigate(['/login']);

  }

}
