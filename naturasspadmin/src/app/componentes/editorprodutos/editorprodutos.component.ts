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
  public destaque!: boolean;
  public disponivel!: boolean;
  public arquivo!: File;
  public result: number;
  public mensagemTOAST!: string;


  constructor(private activatedRoute: ActivatedRoute,
              private categService: CatergoriaService,
              private produtoService: ProdutoService){ 
 
    this.produto = new Produto();
    let id = this.activatedRoute.snapshot.params["id"];
    if(id === "new"){
      this.mode = 0;
    }
    this.result = 0;

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
        this.produto.linkFoto = "assets/images/"+res.pathToFile;

      }
    )
  }

  public selectFile(event: any){
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
  }

  public enviarProduto(){
    this.produto.destaque = (this.destaque)?1:0;
    this.produto.disponivel = (this.disponivel)?1:0;
    console.log(this.produto);
    this.produtoService.enviarProduto(this.produto).subscribe(
      (res: Produto) => {
        this.result = 1; //sucesso
        this.mensagemTOAST = "Produto cadastrado com sucesso.";
        alert("Produto cadastrado com sucesso.");
      },
      (erro) => {
        this.result = -1; //erro
        this.mensagemTOAST = "ERRO ao cadastrar produto.";
        alert("ERRO ao cadastrar produto.");
      }

    )
  }

}
