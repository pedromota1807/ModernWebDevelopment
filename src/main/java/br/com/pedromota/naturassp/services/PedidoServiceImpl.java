package br.com.pedromota.naturassp.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.PedidoDao;
import br.com.pedromota.naturassp.dto.VendasPorDataDTO;
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
			novo.setStatus(Pedido.NOVO_PEDIDO);
			novo.setValorTotal(total);
			dao.save(novo);
			return novo;
		}
		catch(Exception ex){
			return null;
		}
		
	}

	@Override
	public ArrayList<Pedido> buscarPorStatus(int status) {
		// TODO Auto-generated method stub
		return dao.findAllByStatusOrderByDataPedidoDesc(status);
	}

	@Override
	public Pedido mudarStatus(int idPedido, int novoStatus) {
		try {
			Pedido pedido = dao.findById(idPedido).get();
			pedido.setStatus(novoStatus);
			dao.save(pedido);
			return pedido;
		}
		catch(Exception ex) {
			return null;
		}
	}

	@Override
	public ArrayList<Pedido> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
		// TODO Auto-generated method stub
		return dao.findAllByDataPedidoBetween(inicio, fim);
	}

	@Override
	public ArrayList<Pedido> buscarTodos() {
		// TODO Auto-generated method stub
		return dao.findAllByOrderByDataPedidoDesc();
	}

	@Override
	public List<VendasPorDataDTO> recuperarTotaisUltimaSemana() {
		// TODO Auto-generated method stub
		ArrayList<VendasPorDataDTO> lista = new ArrayList<VendasPorDataDTO>();
		for(Object[] values: dao.recuperarVendasPorData()) {
			lista.add(new VendasPorDataDTO(Double.parseDouble(values[0].toString()), 
										   LocalDate.parse(values[1].toString())));
		}
		return lista;
	}
	
	
}
