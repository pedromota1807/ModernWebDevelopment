import { ItemPedido } from "./ItemPedido";

//aqui fazemos o objeto pedido que funciona como nosso carrinho de compras
export class Pedido{
    public itensPedido: ItemPedido[];
    public valorTotal: number;
}