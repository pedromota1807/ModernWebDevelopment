package br.com.pedromota.naturassp.services;

import java.util.ArrayList;

import br.com.pedromota.naturassp.model.Cliente;

public interface IClienteService {
	public Cliente buscarPeloCpf(String cpf);
	public Cliente atualizarDados(Cliente dadosOriginais);
	public ArrayList<Cliente> buscarPorLetra(String letra);
	public ArrayList<Cliente> buscarPorPalavraChave(String palavraChave);
	public ArrayList<Cliente> buscarTodos();
}
