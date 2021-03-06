package br.com.pedromota.naturassp.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.pedromota.naturassp.dto.PathDto;
import br.com.pedromota.naturassp.model.Categoria;
import br.com.pedromota.naturassp.model.Produto;
import br.com.pedromota.naturassp.services.IProdutoService;
import br.com.pedromota.naturassp.services.IUploadService;

@RestController
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private IProdutoService service;
	
	@Autowired 
	private IUploadService upload;
	
	@PostMapping("/produto")
	public ResponseEntity<Produto> novoProduto(@RequestBody Produto novo){
		try {
			service.inserirNovoProduto(novo);
			return ResponseEntity.status(200).body(novo);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/produto/{idProduto}")
	public ResponseEntity<Produto> atualizarProduto(@RequestBody Produto atual, @PathVariable int idProduto){
		try {
			if(idProduto != atual.getIdProduto()) {
				return ResponseEntity.badRequest().build();
			}
			Produto res = service.alterarProduto(atual);
			return ResponseEntity.ok(res);
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PostMapping("/produto/upload")
	public ResponseEntity<PathDto> uploadFotos(@RequestParam(name = "arquivo") MultipartFile arquivo){
		String path = upload.uploadFile(arquivo);
		if(path != null) {
			PathDto pathDto = new PathDto();
			pathDto.setPathToFile(path);
			return ResponseEntity.status(201).body(pathDto);
		}
		return ResponseEntity.badRequest().build();
	}
	
	@GetMapping("/produto")
	public ResponseEntity<ArrayList<Produto>> recuperarTodos(){
		return ResponseEntity.ok(service.listarDestaques());
	}
	
	@GetMapping("/produto/categoria/{id}")
	public ResponseEntity<ArrayList<Produto>> recuperarPorCategoria(@PathVariable (name = "id") int idCateg){
		Categoria cat = new Categoria();
		cat.setId(idCateg);
		return ResponseEntity.ok(service.listarPorCategoria(cat));
	}
	
	@GetMapping("/produto/{id}")
	public ResponseEntity<Produto> recuperarPorId(@PathVariable (name = "id") int idProduto){
		Produto prod = service.recuperarPorId(idProduto);
		if(prod != null) {
			return ResponseEntity.ok(prod);
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/produto/busca")
	public ResponseEntity<ArrayList<Produto>> buscarPorPalavraChave(@RequestParam (name="key") String key){
		System.out.println("Key = " + key);
		if(key != null) {
			return ResponseEntity.ok(service.listarPorPalavraChave(key));
		}
		return ResponseEntity.badRequest().build();
	}
	
	@GetMapping("/produto/todos")
	public ResponseEntity<ArrayList<Produto>> buscarTodos(){
		return ResponseEntity.ok(service.listarTodos()); 
	}
}
