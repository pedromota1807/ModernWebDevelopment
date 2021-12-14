package br.com.pedromota.naturassp.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.ProdutoDao;
import br.com.pedromota.naturassp.model.Categoria;
import br.com.pedromota.naturassp.model.Produto;

@Component
public class ProdutoServiceImpl implements IProdutoService{
	
	@Autowired
	private ProdutoDao dao;

	@Override
	public Produto inserirNovoProduto(Produto produto) {
		try {
			dao.save(produto);
			return produto;
		}
		catch(Exception ex) {
			System.out.println("-------------ProdutoService.inserirNovoProduto-------------");
			ex.printStackTrace();
			System.out.println("-----------------------------------------------------------");
		}
		return null;
	}

	@Override
	public Produto alterarProduto(Produto produto) {
		try {
			dao.save(produto);
			return produto;
		}
		catch(Exception ex) {
			System.out.println("-------------ProdutoService.alterarProduto-------------");
			ex.printStackTrace();
			System.out.println("-------------------------------------------------------");
		}
		return null;
	}

	@Override
	public ArrayList<Produto> listarTodos() {
		return (ArrayList<Produto>)dao.findAll();
	}

	@Override
	public ArrayList<Produto> listarDisponiveis() {
		// considera os itens disponiveis(1)
		return (ArrayList<Produto>)dao.findAllByDisponivel(1);
	}

	@Override
	public ArrayList<Produto> listarPorCategoria(Categoria categoria) {
		
		return (ArrayList<Produto>)dao.findAllByDisponivelAndCategoria(1, categoria);
	}

	@Override
	public ArrayList<Produto> listarIndisponiveis() {
		
		return (ArrayList<Produto>)dao.findAllByDisponivel(0);
	}

	@Override
	public Produto recuperarPorId(int id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	public ArrayList<Produto> listarPorPalavraChave(String palavraChave) {
		// TODO Auto-generated method stub
		return dao.findByNomeContainingOrDetalheContaining(palavraChave, palavraChave);
	}

	@Override
	public ArrayList<Produto> listarDestaques() {
		// TODO Auto-generated method stub
		return dao.findAllByDestaque(1);
	}
	

}
