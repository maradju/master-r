package com.masterrad.schoolbackend.controller;

import com.masterrad.schoolbackend.dao.CourseRepository;
import com.masterrad.schoolbackend.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://skola.test:4401")
@RestController
@RequestMapping("/api")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/courses")
    public Course createCourse(@Valid @RequestBody Course course) {
        return courseRepository.save(course);
    }

    @GetMapping("/courses")
    public List<Course> returnCourses() {
        return courseRepository.findAll();
    }

    @DeleteMapping("/courses/{courseId}")
    public void deleteCourse(@PathVariable("courseId") Long courseId) {
        courseRepository.deleteById(courseId);
    }

    @PutMapping("/courses/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable(value = "courseId") Long courseId, @Valid @RequestBody Course courseDetails) throws ResourceNotFoundException {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException( "Course not found for this id:" + courseId));

        course.setName(courseDetails.getName());
        course.setStart_date(courseDetails.getStart_date());
        course.setEnd_date(courseDetails.getEnd_date());
        course.setSubject(courseDetails.getSubject());
        course.setProfessor(courseDetails.getProfessor());

        final Course updatedCourse = courseRepository.save(course);
        return ResponseEntity.ok(updatedCourse);
    }
}
