package com.masterrad.schoolbackend.controller;

import com.masterrad.schoolbackend.dao.SubjectRepository;
import com.masterrad.schoolbackend.entity.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://skola.test:4401")
@RestController
@RequestMapping("/api")
public class SubjectController  {

    @Autowired
    private SubjectRepository subjectRepository;

    @PostMapping("/subjects")
    public Subject createSubject(@Valid @RequestBody Subject subject) {
        return subjectRepository.save(subject);
    }

    @GetMapping("/subjects")
    public List<Subject> returnSubjects() {
        return subjectRepository.findAll();
    }

    @DeleteMapping("/subjects/{subjectId}")
    public void deleteSubject(@PathVariable("subjectId") Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }

    @PutMapping("/subjects/{subjectId}")
    public ResponseEntity<Subject> updateSubject(@PathVariable(value = "subjectId") Long subjectId, @Valid @RequestBody Subject subjectDetails) throws ResourceNotFoundException {

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException( "Subject not found for this id:" + subjectId));

        subject.setName(subjectDetails.getName());
        subject.setSyllabus(subjectDetails.getSyllabus());
        subject.setLiterature(subjectDetails.getLiterature());

        final Subject updatedSubject = subjectRepository.save(subject);
        return ResponseEntity.ok(updatedSubject);
    }
}
