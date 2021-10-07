package br.com.pedromota.naturassp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.PedidoDao;
import br.com.pedromota.naturassp.model.ItemPedido;
import br.com.pedromota.naturassp.model.Pedido;

@Component
public class PedidoServiceImpl implements IPedidoService{
	@Autowired
	private PedidoDao dao;

	@Override
	public Pedido inserirPedido(Pedido novo) {
		try {
			double total = 0.0;
			/* aqui vem a regra de negócio */
			for(ItemPedido item: novo.getItensPedido()) {
				item.setPrecoUnitario(item.getProduto().getPreco());
				total += item.getPrecoTotal();
			}
			/*----------------*/
			for(ItemPedido item: novo.getItensPedido()) {
				item.setPedido(novo);
			}
			novo.setValorTotal(total);
			dao.save(novo);
			return novo;
		}
		catch(Exception ex){
			return null;
		}
		
	}
	
	
}
