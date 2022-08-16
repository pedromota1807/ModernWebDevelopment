import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-editorusuario',
  templateUrl: './editorusuario.component.html',
  styleUrls: ['./editorusuario.component.css']
})
export class EditorusuarioComponent implements OnInit {

  public senhasIguais = true;
  public usuario: Usuario;
  public senha!: String;

  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }
public sugereUsername(){

}

public confereSenha(){
  if(this.senha === this.usuario.senha){
    this.senhasIguais = true;
  }
  else{
    this.senhasIguais = false;
  }
}

public atualizarUsuario(){
  
}


}
