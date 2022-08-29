package com.masterrad.schoolbackend.dao;

import com.masterrad.schoolbackend.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin("http://skola.test:4401")
public interface StudentRepository extends JpaRepository<Student, Long> {

    Page<Student> findByFirstNameContaining(@RequestParam("firstName") String firstName, Pageable pageable);

}
