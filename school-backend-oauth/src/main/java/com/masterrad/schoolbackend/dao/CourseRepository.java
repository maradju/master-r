package com.masterrad.schoolbackend.dao;

import com.masterrad.schoolbackend.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://skola.test:4401")
public interface CourseRepository extends JpaRepository<Course, Long> {

    Page<Course> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
