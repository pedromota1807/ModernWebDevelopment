import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public lista: Usuario[] = [];
  constructor(private service: UsuarioService) {
    this.service.recuperarTodos().subscribe(
      (res: Usuario[]) => { this.lista = res }
    );

  }

  ngOnInit(): void {
  }

  public mudaStatus(usuario: Usuario) {
    usuario.ativo = (usuario.ativo) ? 1 : 0;
    this.service.atualizarUsuario(usuario).subscribe(
      (res: Usuario) => { alert("Usuário alterado!") },
      (err: any) => { alert("Erro ao atualizar usuário.") }
    );
  }
}
