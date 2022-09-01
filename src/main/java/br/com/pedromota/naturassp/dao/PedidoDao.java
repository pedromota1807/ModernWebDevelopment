package br.com.pedromota.naturassp.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Cliente;
import br.com.pedromota.naturassp.model.Pedido;

/* Possíveis combinações*/
/* 0 - todos
 * 1 - somente status
 * 2 - somente nome
 * 3 - nome e status
 * 4 - somente data
 * 5 - data e status
 * 6 - data e nome
 * 7 - data, nome e status7 
 */

public interface PedidoDao extends CrudRepository<Pedido, Integer>{
	
	public ArrayList<Pedido> findAllByCliente(Cliente cliente);
	
	public ArrayList<Pedido> findAllByStatusOrderByDataPedidoDesc(int status);
	/*combinação 0*/
	public ArrayList<Pedido> findAllByOrderByDataPedidoDesc();
	/*combinação 1*/
	public ArrayList<Pedido> findAllByStatusInOrderByDataPedidoDesc(Collection<Integer> status);
	/*combinação 2*/
	public ArrayList<Pedido> findAllByClienteInOrderByDataPedidoDesc(Collection<Cliente> cliente);
	/*combinação 3*/
	public ArrayList<Pedido> findAllByClienteInAndStatusInOrderByDataPedidoDesc(Collection<Cliente> cliente, Collection<Integer> status);
	/*combinação 4*/
	public ArrayList<Pedido> findAllByDataPedidoBetweenOrderByDataPedidoDesc(LocalDate inicio, LocalDate fim);
	/*combinação 5*/
	public ArrayList<Pedido> findAllByDataPedidoBetweenAndStatusInOrderByDataPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Integer> status);
	/*combinação 6*/
	public ArrayList<Pedido> findAllByDataPedidoBetweenAndClienteInOrderByDataPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Cliente> cliente);
	/*combinação 7*/
	public ArrayList<Pedido> findAllByDataPedidoBetweenAndClienteInAndStatusInOrderByDataPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Cliente> cliente, Collection<Integer> status); 
	
	@Query(value="select sum(valor_total) as total, data_pedido as data "
			+ " from tbl_pedido "
			+ " where data_pedido between (date_sub(now(), interval 7 day)) and now() "
			+ " group by (data_pedido) "
			+ " order by data_pedido desc ", nativeQuery = true)	
			
	public List<Object[]> recuperarVendasPorData();
	
	
	
	

}
