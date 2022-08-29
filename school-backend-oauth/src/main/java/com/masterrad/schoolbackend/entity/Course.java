package com.masterrad.schoolbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="course")
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="start_date")
    private Date start_date;

    @Column(name="end_date")
    private Date end_date;

    @ManyToOne
    @JoinColumn(name="subject_id", nullable=true)
    private Subject subject;

    @ManyToOne
    @JoinColumn(name="professor_id", nullable=true)
    private Professor professor;
}
