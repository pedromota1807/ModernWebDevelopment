import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { FiltroPedidoDTO } from 'src/app/model/filtroPedidoDTO';
import { Pedido } from 'src/app/model/Pedido';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public lista: Pedido[] = [];
  public detalhe: Pedido = new Pedido();
  public filtroPedido: FiltroPedidoDTO = new FiltroPedidoDTO();

  constructor(private service: PedidoService) { 
    this.detalhe.cliente = new Cliente();
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

  public enviarDetalhes(pedido: Pedido){
    this.detalhe = pedido;
    document.getElementById("btnModal")?.click();
  }

  public filtrarPedidos(){
    console.log(this.filtroPedido);
  }

}
