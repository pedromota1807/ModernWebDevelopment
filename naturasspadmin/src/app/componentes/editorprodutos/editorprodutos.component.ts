import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { PathDTO } from 'src/app/model/PathDTO';
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
    const formData = new FormData();
    formData.append("arquivo", this.arquivo, this.arquivo.name);
    //formData.append("teste", "String de teste");
    
    console.log(formData.get("arquivo"));

    this.produtoService.uploadFoto(formData).subscribe(
      (res: PathDTO) => {
        this.produto.linkFoto = "images/"+res.pathToFile;

      }
    )
  }

  public selectFile(event: any){
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
  }

}
