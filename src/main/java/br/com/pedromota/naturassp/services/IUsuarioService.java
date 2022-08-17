package br.com.pedromota.naturassp.services;

import java.util.ArrayList;

import br.com.pedromota.naturassp.model.Usuario;

public interface IUsuarioService {
	
	public Usuario recuperarUsuario(Usuario original);
	public ArrayList<Usuario> recuperarTodos();
	public Usuario adicionarNovo(Usuario novo);
	public Usuario atualizarUsuario(Usuario user);
	public Usuario recuperarPeloId(int id);
}
