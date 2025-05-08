import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.apiUrlAPI;

  public autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuario`, this.autorizacao)
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario/${id}`, this.autorizacao)
  }

  autenticarUsuario(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.url}/usuario/login`, userLogin)
  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/usuario/cadastrar`, usuario)
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/usuario/atualizar`, usuario, this.autorizacao)
  }

  deleteById(id: number) {
    return this.http.delete(`${this.url}/usuario/${id}`, this.autorizacao)
  }

}
