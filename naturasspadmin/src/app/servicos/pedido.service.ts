import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { VendasPorDataDTO } from '../model/VendasPorDataDTO';

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

  public alterarStatus(pedido: Pedido, status: number){
    let token = localStorage.getItem("LTRTK") as string;

    let header = {
      'Authorization': token
    }
    return this.http.get<Pedido>("http://localhost:8080/pedido/"+pedido.idPedido+"?status="+status, {headers: header});
  }

  public recuperarTotaisDaSemana(){
    let token = localStorage.getItem("LTRTK") as string;

    let header = {
      'Authorization': token
    }

    return this.http.get<VendasPorDataDTO[]>("http://localhost:8080/pedido/recentes", {headers: header});
  }
}
