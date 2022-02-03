import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/Pedido';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public lista: Pedido[] = [];
  

  constructor(private service: PedidoService) { 
    this.service.getAllPedidos().subscribe(
      (res: Pedido[]) => { this.lista = res},
      (erro) => {alert("Erro ao recuperar pedidos.")}
    );
  }

  ngOnInit(): void {
  }

  public alterarStatus(pedido: Pedido, status: number){
    this.service.alterarStatus(pedido, status).subscribe(
      (res: Pedido) => {alert("Status do pedido alterado.");
      pedido.status = status;
      },
      (err) => {alert("Erro ao alterar status do Pedido.")}
    )
  }

}
