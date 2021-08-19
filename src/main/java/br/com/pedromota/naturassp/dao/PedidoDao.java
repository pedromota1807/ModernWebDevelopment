package br.com.pedromota.naturassp.dao;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Cliente;
import br.com.pedromota.naturassp.model.Pedido;

public interface PedidoDao extends CrudRepository<Pedido, Integer>{
	
	public ArrayList<Pedido> findAllByCliente(Cliente cliente);
	

}
