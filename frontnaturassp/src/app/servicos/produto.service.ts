import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getAllProdutos(){
    console.log("Estou no produto.service - entrei em contato com BackEnd.")
    return this.http.get("http://localhost:8080/produto");
  }

  public getProdutoPeloId(idProduto: number){
    return this.http.get("http://localhost:8080/produto/"+idProduto);
  }

  public getProdutosPelaCategoria(idCateg: number){
    return this.http.get("http://localhost:8080/produto/categoria/"+idCateg);
  }

  public getProdutosPelaPalavraChave(keyword: string){
    return this.http.get("http://localhost:8080/produto/busca?key="+keyword);
  }
}
