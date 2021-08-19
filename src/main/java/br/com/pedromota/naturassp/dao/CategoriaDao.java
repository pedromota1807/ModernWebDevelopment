package br.com.pedromota.naturassp.dao;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Categoria;

public interface CategoriaDao extends CrudRepository<Categoria, Integer> {

	//cosultas customizadas
	//1 - consulta por palavra chave
	public ArrayList<Categoria> findByNomeContaining(String palavra);
	 
	
}
