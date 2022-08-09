import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public recuperarTodos(){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;
    let header= {
      'Authorization': token
    }
    return this.http.get<Usuario[]>("http://localhost:8080/usuario", {headers: header});
  }

  public atualizarUsuario(usuario: Usuario){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;
    let header= {
      'Authorization': token
    }
    return this.http.put<Usuario>("http://localhost:8080/usuario"+usuario.id, usuario, {headers: header});
  }
}
