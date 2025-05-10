import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UserLogin } from '../model/UserLogin';
import { Page } from '../model/Page';

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

  getAll(
    page: number,
    size: number,
    sortBy: string,
    direction: string
  ): Observable<Page> {
    let query = `?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    return this.http.get<Page>(`${this.url}/usuario${query}`, this.autorizacao)
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

  logado() {
    /* CRIA UMA VARIAVEL BOOLEAN */
    let ok: boolean = false;

    /* CRIA UMA CONDIZIONAL, CASO MEU TOKEN QUE VEM DA MINHA VARIAVEL BLOBAL, ESTEJA COM ALGUM DADO, ATRIBUA 'true' A MINHA VARIAVEL 'ok' */
    if(environment.token != '') {
      /* ATRIBUI 'true' A VARAIVEL 'ok' */
      ok = true;

    }

    /* RETORNA O VALOR DA VARIAVEL */
    return ok;
  }

}
