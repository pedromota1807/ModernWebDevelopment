import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public recuperarTodos(){
    return this.http.get<Produto[]>("http://localhost:8080/produto/todos");
  }
}
