import { Categoria } from "./Categoria";

export class Produto{
  public idProduto: number;
  public nome: string;
  public detalhe: string;
  public linkFoto: string;
  public preco: number;
  public disponivel: number;
  public categoria: Categoria;

  public constructor(){
    this.idProduto = 0;
    this.nome = "";
    this.detalhe = "";
    this.linkFoto = "";
    this.preco = 0;
    this.disponivel = 0;
    this.categoria = new Categoria();
  }
}
