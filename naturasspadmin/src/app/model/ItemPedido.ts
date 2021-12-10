import { Produto } from "./Produto";

export class ItemPedido{
    public qtdeItem: number;
    public precoUnitario: number;
    public precoTotal: number;
    public produto: Produto;

    public constructor(){
        this.qtdeItem = 0;
        this.precoUnitario = 0;
        this.precoTotal = 0;
        this.produto = new Produto();
    }
}