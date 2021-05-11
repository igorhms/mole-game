package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/rank")
public class RankingController {
	
	@Autowired
	RankingRepository rankRepository;
	
	@GetMapping()
	public List<Ranking> listaRank(){
		return rankRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
	}
	
	@PostMapping
	public Ranking novaPontuacao(@RequestBody Ranking rank) {
		return rankRepository.save(rank);
	}	
}