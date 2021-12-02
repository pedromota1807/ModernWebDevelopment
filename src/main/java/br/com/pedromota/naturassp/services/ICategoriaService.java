package br.com.pedromota.naturassp.services;

import java.util.ArrayList;

import br.com.pedromota.naturassp.model.Categoria;

public interface ICategoriaService {
	
	public Categoria inserirNovaCategoria(Categoria categoria);
	
	public Categoria alterarCategoria(Categoria categoria);
	
	public ArrayList<Categoria> recuperarTodasCategorias();
	
	public ArrayList<Categoria> recuperarPorPalavraChave(String palvraChave);
	
	public Categoria recuperarPorId (int id);
	
}
