import { UsuarioService } from './../../service/usuario.service';
import { EnderecoService } from './../../service/endereco.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../model/Endereco';
import { Usuario } from '../../model/Usuario';
import { Page } from '../../model/Page';
import { AlertaComponent } from '../util/alerta/alerta.component';
import { Alerta } from '../../model/Alerta';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnChanges {

  @ViewChild(AlertaComponent) alertaComponent!: AlertaComponent;

  @Input() idEmpresa: number = 0;
  @Input() idUsuario: number = 0;

  @Output() enderecoOutput = new EventEmitter<Endereco>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idEmpresa']) {
      console.log('idEmpresa mudou:', changes['idEmpresa'].currentValue);

      if(this.idEmpresa > 0) {
        this.getByIdEndereco(this.idEmpresa);
      }

    }

  }

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
    let cep: string = event?.target?.value;

    this.enderecoService.getByCep(cep.replace(/\D/g, '')).subscribe((resp: Endereco) => {
      this.endereco = resp;

      console.log('this.endereco: ', this.endereco);
    }, err => {
      this.setMensagem({
        titulo: 'Busca CEP',
        mensagem: `O CEP: ${cep} informado nao foi localizado.`,
        tipo: ''
      });
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
    }, err => {
      this.setMensagem({
        titulo: 'Excluir Endereco',
        mensagem: 'Ocorreu um erro ao tentar excluir o endereco.',
        tipo: 'erro'
      });
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
    }, err => {
      this.setMensagem({
        titulo: 'Cadastrar Endereco',
        mensagem: 'Ocorreu um erro ao tentar cadastrar o endereco.',
        tipo: 'erro'
      });
    });
  }

  setMensagem(alerta: Alerta) {
    this.alertaComponent.setObjAlerta(alerta);
    this.alertaComponent.openModal();
  }

}
