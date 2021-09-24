import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe: Produto;
  public quantidade: number;

  constructor(private route: ActivatedRoute, 
              private service: ProdutoService,
              private nav: Router) {
    this.quantidade = 1; 
   }

  ngOnInit(): void {
    this.route.params.subscribe(parameter =>{
      //console.log("Recebi o parametro = "+parameter["idProduto"]);
      this.recuperaProduto(parameter["idProduto"]);
    })
  }

  public recuperaProduto(idProduto: number){
    this.service.getProdutoPeloId(idProduto).subscribe(
     (prod: Produto) => {this.produtoDetalhe = prod;},
     erro => {alert("produto invalido")}
    );
  }

  public adicionarCarrinho(){
    let pedido: Pedido;
    pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    if(!pedido){  // se não existir, será criado um pedido 
      pedido = new Pedido();
      pedido.valorTotal = 0;
      pedido.itensPedido = [];
    }

    let item: ItemPedido;
    item = new ItemPedido();
    item.qtdeItem = this.quantidade;
    item.produto = this.produtoDetalhe;
    item.precoUnitario = this.produtoDetalhe.preco;
    item.precoTotal = item.precoUnitario * item.qtdeItem;
    
    pedido.itensPedido.push(item);
    console.log(JSON.stringify(item));

    pedido.valorTotal = pedido.valorTotal + item.precoTotal; 

    
    localStorage.setItem("LeetirCarrinho", JSON.stringify(pedido));

    this.nav.navigate(['carrinho']);

  }

}
