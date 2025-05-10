import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { UsuarioComponent } from './components/editar/usuario/usuario.component';
import { UsuariosComponent } from './components/lista/usuarios/usuarios.component';
import { EnderecosComponent } from './components/lista/enderecos/enderecos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'editar/usuario/:id',
    component: UsuarioComponent
  },
  {
    path: 'lista/usuarios',
    component: UsuariosComponent
  },
  {
    path: 'lista/enderecos',
    component: EnderecosComponent
  }
];
