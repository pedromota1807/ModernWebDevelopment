import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CatergoriaService {

  
  constructor(private http: HttpClient) {}

  public getAllCategorias(){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header ={
      'Authorization': token
    }
    return this.http.get<Categoria[]>("http://localhost:8080/categoriabyid", {headers: header});
  }

  public getById(id: number){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header ={
      'Authorization': token
    }

    return this.http.get<Categoria>("http://localhost:8080/categoria/"+id, {headers : header});
  }

  public incluirNovaCategoria(categoria: Categoria){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header ={
      'Authorization': token
    }
    return this.http.post<Categoria>("http://localhost:8080/categoria", categoria, {headers : header});
  }

  public atualizarCategoria(categoria: Categoria){
    let token: string;
    token = localStorage.getItem("LTRTK") as string;

    let header ={
      'Authorization': token
    }
    return this.http.put<Categoria>("http://localhost:8080/categoria", categoria, {headers : header});
  }
}
