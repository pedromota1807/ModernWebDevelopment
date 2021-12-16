import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { CatergoriaService } from 'src/app/servicos/catergoria.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-editorprodutos',
  templateUrl: './editorprodutos.component.html',
  styleUrls: ['./editorprodutos.component.css']
})
export class EditorprodutosComponent implements OnInit {

  public mode: number = 1;
  public listaCategorias: Categoria[] = [] ;
  public produto: Produto;
  public arquivo!: File;


  constructor(private activatedRoute: ActivatedRoute,
              private categService: CatergoriaService,
              private produtoService: ProdutoService){ 
 
    this.produto = new Produto();
    let id = this.activatedRoute.snapshot.params["id"];
    if(id === "new"){
      this.mode = 0;
    }

    //independente de qqer coisa busco todas as categorias
    this.categService.getAllCategorias().subscribe(
      (res: Categoria[]) => {
        this.listaCategorias = res;
      }
    )
  }

  ngOnInit(): void {
  }

  public uploadFoto(){
    var formData: FormData;
    formData = new FormData();
    formData.append(this.arquivo.name, this.arquivo);
    formData.append("string", "simple")

    this.produtoService.uploadFoto(formData).subscribe(
      (res) => { console.log(res)}
    )
    
  }

}
