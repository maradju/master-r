package com.masterrad.schoolbackend.controller;

import com.masterrad.schoolbackend.dao.EnrollmentRepository;
import com.masterrad.schoolbackend.entity.Enrollment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://skola.test:4401")
@RestController
@RequestMapping("/api")
public class EnrollmentController  {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @PostMapping("/enrollments")
    public Enrollment createEnrollment(@Valid @RequestBody Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    @GetMapping("/enrollments")
    public List<Enrollment> returnEnrollments() {
        return enrollmentRepository.findAll();
    }

    @DeleteMapping("/enrollments/{enrollmentId}")
    public void deleteEnrollment(@PathVariable("enrollmentId") Long enrollmentId) {
        enrollmentRepository.deleteById(enrollmentId);
    }

    @PutMapping("/enrollments/{enrollmentId}")
    public ResponseEntity<Enrollment> updateEnrollment(@PathVariable(value = "enrollmentId") Long enrollmentId, @Valid @RequestBody Enrollment enrollmentDetails) throws ResourceNotFoundException {

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException( "Enrollment not found for this id:" + enrollmentId));

        enrollment.setFinished(enrollmentDetails.isFinished());
        enrollment.setGrade(enrollmentDetails.getGrade());
        enrollment.setStudent(enrollmentDetails.getStudent());
        enrollment.setCourse(enrollmentDetails.getCourse());

        final Enrollment updatedEnrollment = enrollmentRepository.save(enrollment);
        return ResponseEntity.ok(updatedEnrollment);
    }
}
