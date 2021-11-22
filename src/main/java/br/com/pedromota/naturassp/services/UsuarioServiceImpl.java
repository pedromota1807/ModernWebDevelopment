package br.com.pedromota.naturassp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.pedromota.naturassp.dao.UsuarioDao;
import br.com.pedromota.naturassp.model.Usuario;

@Component
public class UsuarioServiceImpl implements IUsuarioService{
	
	@Autowired
	private UsuarioDao dao;

	@Override
	public Usuario recuperarUsuario(Usuario original) {
		Usuario user = dao.findByUsernameOrEmail(original.getUsername(), original.getEmail());
		if(user != null) {
			if(user.getSenha().equals(original.getSenha())) {
				user.setSenha(null);
				return user;
			}
		}
		return null;
	}
	
	
}
