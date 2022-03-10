package br.com.pedromota.naturassp.dao;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Cliente;

public interface ClienteDao extends CrudRepository<Cliente, Integer>{
	
	public Cliente findByEmailOrTelefone(String email, String telefone);
	public Cliente findByTelefone(String telefone);
	public Cliente findByCpf(String cpf);
	public ArrayList<Cliente> findByNomeStartsWith(String prefixo);
	public ArrayList<Cliente> findByNomeContaining(String keyword);
	public ArrayList<Cliente> findByOrderByNomeAsc();
	
}
