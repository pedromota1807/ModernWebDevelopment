package br.com.pedromota.naturassp.services;

import br.com.pedromota.naturassp.model.Cliente;

public interface IClienteService {
	public Cliente buscarPeloCpf(String cpf);
	public Cliente atualizarDados(Cliente dadosOriginais);
}
