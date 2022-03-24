import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
    public buscarTodos(){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header= {
      'Authorization': token
    }
    return this.http.get<Cliente[]>("http://localhost:8080/cliente", {headers: header})
    }

    public buscarPorLetra(letra: string){
      let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header= {
      'Authorization': token
    }
    return this.http.get<Cliente[]>("http://localhost:8080/cliente/nome/"+letra, {headers: header})
    }

    public buscarPorPalavraChave(keyword: string){
      let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header= {
      'Authorization': token
    }
    return this.http.get<Cliente[]>("http://localhost:8080/cliente/busca/"+keyword, {headers: header})
    }

}
