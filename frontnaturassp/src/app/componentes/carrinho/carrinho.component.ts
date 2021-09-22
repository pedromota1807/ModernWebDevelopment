import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/Pedido';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public pedido: Pedido;
  public vazio: boolean;
  constructor() {
    
   }

  ngOnInit(): void {
    this.pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    if(!this.pedido){
      this.vazio = true;
    }
    
  }

}
