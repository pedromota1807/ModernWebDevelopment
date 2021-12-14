package br.com.pedromota.naturassp.services;

import java.util.ArrayList;

import br.com.pedromota.naturassp.model.Categoria;
import br.com.pedromota.naturassp.model.Produto;

public interface IProdutoService {
	public Produto inserirNovoProduto(Produto produto);
	public Produto alterarProduto(Produto produto);
	public ArrayList<Produto> listarTodos();
	public ArrayList<Produto> listarDisponiveis();
	public ArrayList<Produto> listarIndisponiveis();
	public ArrayList<Produto> listarDestaques();
	public ArrayList<Produto> listarPorCategoria(Categoria categoria);
	public ArrayList<Produto> listarPorPalavraChave(String palavraChave);
	public Produto recuperarPorId(int id);
}
