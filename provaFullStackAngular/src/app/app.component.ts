import { UsuarioService } from './service/usuario.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/util/header/header.component";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'provaFullStackAngular';

  public isHeader: boolean = environment.token != '';

  constructor(
    public usuarioService: UsuarioService
  ) {}

}
