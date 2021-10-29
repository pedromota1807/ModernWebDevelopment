import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Pedido } from 'src/app/model/Pedido';
import { BuscarprodutobykeyService } from 'src/app/servicos/buscarprodutobykey.service';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public lista: Categoria[];
  public numItens: number;
  private pedido: Pedido;
  public keyword: string = "";

  constructor(private service: CategoriaService, 
              private carService: CarrinhoService, 
              private route: Router,
              private busca: BuscarprodutobykeyService) { 
    this.numItens = 0;
  }

  ngOnInit(): void {
    this.numItens = 0;
    this.pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    if(this.pedido){
      this.numItens = this.pedido.itensPedido.length;
    }


    this.service.getAllCategorias()
            .subscribe((res: Categoria[]) => this.lista = res,
                        err => console.log(err));
    this.carService.getNumberOfItens().subscribe(
      (res) => (this.numItens = res)
    );
  }

  public buscar(){
    //console.log(this.keyword);
    if(this.keyword){
      console.log("Navbar = "+this.keyword);
      this.busca.getKeyword().next(this.keyword);
      this.route.navigate(['/busca'])
    }
  }

}
