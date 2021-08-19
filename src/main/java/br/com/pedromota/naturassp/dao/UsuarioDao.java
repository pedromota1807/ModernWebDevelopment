package br.com.pedromota.naturassp.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.pedromota.naturassp.model.Usuario;

public interface UsuarioDao extends CrudRepository<Usuario, Integer>{
	public Usuario findByUsernameOrEmail(String username, String email);

}
