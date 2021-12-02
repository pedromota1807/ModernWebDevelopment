import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CatergoriaService {

  constructor(private http: HttpClient) { }

  public getAllCategorias(){
    return this.http.get<Categoria[]>("http://localhost:8080/categoria");
  }

  public getById(id: number){
    return this.http.get<Categoria>("http://localhost:8080/categoria/"+id);
  }
}
