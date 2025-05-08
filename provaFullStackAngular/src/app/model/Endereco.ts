import { Usuario } from "./Usuario";

export class Endereco {
  public id: number;
	public logradouro: string;
	public numero: number;
	public complemento: string;
	public bairro: string;
	public cidade: string;
	public estado: string;
	public cep: string;
	public dataCadastro: Date;
	public usuario: Usuario;
}
