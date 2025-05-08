import { Data } from "@angular/router";
import { Endereco } from "./Endereco";

export class Usuario {
  public id: number;
  public nome: string;
  public email: string;
  public senha: string;
  public dataCadastro: Data;
  public enderecos: Endereco[];
  public role: string;
}
