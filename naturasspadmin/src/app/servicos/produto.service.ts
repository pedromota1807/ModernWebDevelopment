import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathDTO } from '../model/PathDTO';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public recuperarTodos(){
    return this.http.get<Produto[]>("http://localhost:8080/produto/todos");
  }

  public uploadFoto(formData: FormData){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header ={
      'Authorization': token
    }
    return this.http.post<PathDTO>("http://localhost:8080/produto/upload", formData, {headers:header});
  }

  public enviarProduto(produto: Produto){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header= {
      'Authorization': token
    }
    return this.http.post<Produto>("http://localhost:8080/produto", produto, {headers: header});
  }

  public recuperarPeloId(idProduto: number){
    return this.http.get<Produto>("http://localhost:8080/produto/"+idProduto);
  }

  public atualizarProduto(produto: Produto){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header= {
      'Authorization': token
    }
    return this.http.put<Produto>("http://localhost:8080/produto/"+produto.idProduto, produto, {headers: header});
  }
}
