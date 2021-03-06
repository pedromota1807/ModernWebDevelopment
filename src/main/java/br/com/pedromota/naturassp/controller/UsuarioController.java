package br.com.pedromota.naturassp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.pedromota.naturassp.model.Usuario;
import br.com.pedromota.naturassp.security.JWTToken;
import br.com.pedromota.naturassp.security.JWTTokenUtil;
import br.com.pedromota.naturassp.services.IUsuarioService;

@RestController
@CrossOrigin
public class UsuarioController {
	
	@Autowired
	private IUsuarioService service;
	
	@PostMapping("/login")
	public ResponseEntity<JWTToken> fazerLogin(@RequestBody Usuario dadosLogin){
		Usuario user = service.recuperarUsuario(dadosLogin);
		if(user != null) {
				//aqui cria-se o token do usuario
				JWTToken jwtToken = new JWTToken();
				jwtToken.setToken(JWTTokenUtil.generateToken(user));
				
				return ResponseEntity.ok(jwtToken);
			
		}
		return ResponseEntity.status(403).build();
	}
}
