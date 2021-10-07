package br.com.pedromota.naturassp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.ClienteDao;
import br.com.pedromota.naturassp.model.Cliente;

@Component
public class ClienteServiceImpl implements IClienteService {
	
	@Autowired
	private ClienteDao dao;

	@Override
	public Cliente buscarPeloCpf(String cpf) {
		// TODO Auto-generated method stub
	
		return dao.findByCpf(cpf);
	}

	@Override
	public Cliente atualizarDados(Cliente dadosOriginais) {
		// TODO Auto-generated method stub
		return dao.save(dadosOriginais);
	}
}
