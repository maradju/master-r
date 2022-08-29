package com.masterrad.schoolbackend.controller;

import com.masterrad.schoolbackend.dao.ProfessorRepository;
import com.masterrad.schoolbackend.entity.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://skola.test:4401")
@RestController
@RequestMapping("/api")
public class ProfessorController  {

    @Autowired
    private ProfessorRepository professorRepository;

    @PostMapping("/professors")
    public Professor createProfessor(@Valid @RequestBody Professor professor) {
        return professorRepository.save(professor);
    }

    @GetMapping("/professors")
    public List<Professor> returnProfessors() {
        return professorRepository.findAll();
    }

    @DeleteMapping("/professors/{professorId}")
    public void deleteProfessor(@PathVariable("professorId") Long professorId) {
        professorRepository.deleteById(professorId);
    }

    @PutMapping("/professors/{professorId}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable(value = "professorId") Long professorId, @Valid @RequestBody Professor professorDetails) throws ResourceNotFoundException {

        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new ResourceNotFoundException( "Professor not found for this id:" + professorId));

        professor.setFirstName(professorDetails.getFirstName());
        professor.setLastName(professorDetails.getLastName());
        professor.setAbout(professorDetails.getAbout());
        professor.setMobile(professorDetails.getMobile());
        professor.setEmail(professorDetails.getEmail());
        professor.setImageUrl(professorDetails.getImageUrl());

        final Professor updatedProfessor = professorRepository.save(professor);
        return ResponseEntity.ok(updatedProfessor);
    }
}
