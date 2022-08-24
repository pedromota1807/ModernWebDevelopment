package br.com.pedromota.naturassp.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.dto.VendasPorDataDTO;
import br.com.pedromota.naturassp.model.Cliente;
import br.com.pedromota.naturassp.model.Pedido;

public interface PedidoDao extends CrudRepository<Pedido, Integer>{
	
	public ArrayList<Pedido> findAllByCliente(Cliente cliente);
	public ArrayList<Pedido> findAllByDataPedidoBetween(LocalDate inicio, LocalDate fim);
	public ArrayList<Pedido> findAllByStatusOrderByDataPedidoDesc(int status);
	public ArrayList<Pedido> findAllByOrderByDataPedidoDesc();
	
	
	@Query(value=" select sum(valor_total) as total, data_pedido as data "
			+ " from tbl_pedido "
			+ " where data_pedido between (date_sub(now(), interval 30 day)) and now() "
			+ " group by (data_pedido) "
			+ " order by data_pedido desc ", nativeQuery = true)	
			
	public List<Object[]> recuperarVendasPorData();
	
	

}
