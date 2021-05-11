package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UsuarioController {
	
	@Autowired
	UsuarioRepository repository;
	

	@GetMapping("/usuarios")
	public List<Usuario> todos(){
		return repository.findAll();
	}
	
	@PostMapping
	public Usuario novo(@RequestBody Usuario usuario) {
		return repository.save(usuario);
	}
	
}
