import { UsuarioService } from './../../service/usuario.service';
import { EnderecoService } from './../../service/endereco.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../model/Endereco';
import { Usuario } from '../../model/Usuario';
import { Page } from '../../model/Page';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {

  @Input() idEmpresa: number = 0;
  @Input() idUsuario: number = 0;

  @Output() enderecoOutput = new EventEmitter<Endereco>();

  public endereco: Endereco = new Endereco();
  public usuario: Usuario = new Usuario();

  public usuarios: Usuario[] = [];

  constructor(
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    if(this.idUsuario == 0) {
      this.getAllUsuarios();
    }

    if(this.idEmpresa > 0) {
      this.getByIdEndereco(this.idEmpresa);
    }

  }

  eviaAtualizacaoEnderecoOutput(endereco: Endereco) {
    this.enderecoOutput.emit(endereco);

  }

  handleUsuario(event: any) {
    this.usuario.id = event.target.value;
  }

  searchCEP(event: any) {
    this.enderecoService.getByCep(event.target.value).subscribe((resp: Endereco) => {
      this.endereco = resp;

      console.log('this.endereco: ', this.endereco);
    });
  }

  getByIdEndereco(id: number) {
    this.enderecoService.getById(id).subscribe((resp: Endereco) => {
      this.endereco = resp;
    })
  }

  getAllUsuarios() {
    this.usuarioService.getAll(
      0,
      3000,
      '',
      ''
    ).subscribe((resp: Page) => {
      this.usuarios = resp.content;
    })
  }

  excluir() {
    this.enderecoService.deleteById(this.idEmpresa).subscribe((resp: any) => {
      this.eviaAtualizacaoEnderecoOutput(new Endereco());
    });

  }

  cancelar() {
    this.eviaAtualizacaoEnderecoOutput(new Endereco());
  }

  cadastrar() {
    this.usuario.id = this.idUsuario;
    this.endereco.usuario = this.usuario;

    this.enderecoService.cadastrarEndereco(this.endereco).subscribe((resp: Endereco) => {
      this.eviaAtualizacaoEnderecoOutput(resp);
    })
  }

}
