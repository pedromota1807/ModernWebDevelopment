import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  public getAllPedidos(){
    let token = localStorage.getItem("LTRTK") as string;

    let header = {
      'Authorization': token
    }
    return this.http.get<Pedido[]>("http://localhost:8080/pedido", {headers: header});
  }
}
