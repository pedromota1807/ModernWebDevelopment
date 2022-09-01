package br.com.pedromota.naturassp.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.ClienteDao;
import br.com.pedromota.naturassp.dao.PedidoDao;
import br.com.pedromota.naturassp.dto.FiltroPedidoDTO;
import br.com.pedromota.naturassp.dto.VendasPorDataDTO;
import br.com.pedromota.naturassp.model.Cliente;
import br.com.pedromota.naturassp.model.ItemPedido;
import br.com.pedromota.naturassp.model.Pedido;

@Component
public class PedidoServiceImpl implements IPedidoService{
	@Autowired
	private PedidoDao dao;
	
	@Autowired
	private ClienteDao cliDao;

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
		return dao.findAllByDataPedidoBetweenOrderByDataPedidoDesc(inicio, fim);
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

	@Override
	public ArrayList<Pedido> filtrarPorVariosCriterios(FiltroPedidoDTO filtro) {
		boolean temNome   = filtro.getNome() != null && !filtro.getNome().trim().isEmpty();
		boolean temData   = filtro.getDataInicio() != null && filtro.getDatFim() != null;
		boolean temStatus = filtro.getEntregue() != 0 || filtro.getCancelado() != 0 || filtro.getPago() != 0;
		
		if(!temNome && !temData && !temStatus) {
			//condição 0
			System.out.println("------> Condição 0");
			return dao.findAllByOrderByDataPedidoDesc();                        
		}
		else if(!temNome && !temData && temStatus) {
			 //condição 1
			System.out.println("------> Condição 1");
			return dao.findAllByStatusInOrderByDataPedidoDesc(this.getStatus(filtro));         
		}
		else if (!temData && temNome && !temStatus) {
			//condição 2
			ArrayList<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
			return dao.findAllByClienteInOrderByDataPedidoDesc(clientes);      
		}
		else if (!temData && temNome && temStatus) {
			//condição 3
			ArrayList<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());	
			System.out.println("------> Condição 3");
			return dao.findAllByClienteInAndStatusInOrderByDataPedidoDesc(clientes, this.getStatus(filtro)); 
		}
		else if (temData && !temNome && !temStatus) {
			//condição 4
			System.out.println("------> Condição 4");
			return dao.findAllByDataPedidoBetweenOrderByDataPedidoDesc(filtro.getDataInicio(), filtro.getDatFim()); 
		}
		else if (temData && !temNome && temStatus) {
			//condição 5
			System.out.println("------> Condição 5");
			return dao.findAllByDataPedidoBetweenAndStatusInOrderByDataPedidoDesc(filtro.getDataInicio(), filtro.getDatFim(), this.getStatus(filtro));
		}
		else if (temData && temNome && !temStatus) {
			//condição 6
			System.out.println("------> Condição 6");
			ArrayList<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
			return dao.findAllByDataPedidoBetweenAndClienteInOrderByDataPedidoDesc(filtro.getDataInicio(), filtro.getDatFim(), clientes);
		}
		else if (temData && temNome && temStatus) {
			//condição 7
			System.out.println("------> Condição 7");
			ArrayList<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
			return dao.findAllByDataPedidoBetweenAndClienteInAndStatusInOrderByDataPedidoDesc(filtro.getDataInicio(), filtro.getDatFim(), clientes, this.getStatus(filtro));
		}
		
		return null;
		
	}
	
	
	//funções utilitárias
	private Collection<Integer> getStatus(FiltroPedidoDTO filtro){
		Collection<Integer> status = new ArrayList<Integer>();
		if(filtro.getPago()      != 0) status.add(filtro.getPago());
		if(filtro.getCancelado() != 0) status.add(filtro.getCancelado());
		if(filtro.getEntregue()  != 0) status.add(filtro.getEntregue());
		return status;
	}
	
}
