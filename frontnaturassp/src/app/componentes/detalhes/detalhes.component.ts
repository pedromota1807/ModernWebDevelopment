import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe: Produto;

  constructor(private route: ActivatedRoute, private service: ProdutoService) {

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

}
