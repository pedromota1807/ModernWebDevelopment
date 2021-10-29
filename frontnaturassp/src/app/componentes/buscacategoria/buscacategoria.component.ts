import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-buscacategoria',
  templateUrl: './buscacategoria.component.html',
  styleUrls: ['./buscacategoria.component.css']
})
export class BuscacategoriaComponent implements OnInit {

  public lista: Produto[] = [];
  public idCategoria: number;


  constructor(private route: ActivatedRoute, private service: ProdutoService) { 
    this.route.params.subscribe((parameters) => {
      console.log("Selecionei a categoria"  +parameters["id"]); 
      this.idCategoria = parameters["id"];
      this.buscarPorCategoria();
    })
  }

  ngOnInit(): void {
  }
    public buscarPorCategoria(){
      this.service.getProdutosPelaCategoria(this.idCategoria)
      .subscribe(
        (res: Produto[]) => {
            this.lista = res;
        },
        (err) => {
          alert("Erro ao recuperar produtos da categoria");
        }
      )
    }
}


