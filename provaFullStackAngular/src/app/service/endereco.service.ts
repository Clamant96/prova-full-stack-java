import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endereco } from '../model/Endereco';
import { Observable } from 'rxjs';
import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

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
    return this.http.get<Page>(`${this.url}/endereco${query}`, this.autorizacao)
  }

  getAllByUsuarioId(
    id: number,
    page: number,
    size: number,
    sortBy: string,
    direction: string
  ): Observable<Page> {
    let query = `?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    return this.http.get<Page>(`${this.url}/endereco/enderecos/usuario/${id}${query}`, this.autorizacao)
  }

  getById(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.url}/endereco/${id}`, this.autorizacao)
  }

  getByCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.url}/endereco/cep/${cep}`, this.autorizacao)
  }

  cadastrarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.url}/endereco/cadastrar`, endereco, this.autorizacao)
  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.url}/endereco/atualizar`, endereco, this.autorizacao)
  }

  deleteById(id: number) {
    return this.http.delete(`${this.url}/endereco/${id}`, this.autorizacao)
  }

}
