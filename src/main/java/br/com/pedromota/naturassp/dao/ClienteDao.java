package br.com.pedromota.naturassp.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Cliente;

public interface ClienteDao extends CrudRepository<Cliente, Integer>{
	public Cliente findByEmailOrTelefone(String email, String telefone);
	
}
