import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public nome: string = environment.nome;

  constructor(
    private router: Router,
  ){}

  ngOnInit() {
    if(environment.token == "") {
      this.router.navigate(['/login']);
    }

  }
}
