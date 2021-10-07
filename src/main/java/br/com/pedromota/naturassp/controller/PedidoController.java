package br.com.pedromota.naturassp.controller;

import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.pedromota.naturassp.model.Cliente;
import br.com.pedromota.naturassp.model.Pedido;
import br.com.pedromota.naturassp.services.IClienteService;
import br.com.pedromota.naturassp.services.IPedidoService;

@CrossOrigin("*")
@RestController
public class PedidoController {
	
	@Autowired
	private IPedidoService service;
	
	@Autowired
	private IClienteService cliService;
	
	@PostMapping("/pedido")
	public ResponseEntity<Pedido> inserirNovoPedido(@RequestBody Pedido novo){
		
		novo.setDataPedido(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
		System.out.println("-----Pedido-----");
		System.out.println(novo.getObservacoes());
		System.out.println(novo.getDataPedido());
		System.out.println(novo.getItensPedido());
		System.out.println(novo.getCliente().getIdCliente());
		
		System.out.println("------------------");
	
		//antes de gravar o pedido precisa incluir o cliente na base
		Cliente cli = cliService.atualizarDados(novo.getCliente());
		
		novo = service.inserirPedido(novo);
		if(novo != null) {
			return ResponseEntity.status(201).body(novo);
		}
		else {
			return ResponseEntity.status(400).build();
		}
	}
}
