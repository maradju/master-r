package com.masterrad.schoolbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="student")
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="parent_name")
    private String parentName;

    @Column(name="mobile")
    private String mobile ;

    @Column(name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="gender")
    private String gender;

    @Column(name="year_of_birth")
    private Integer yearOfBirth;

    @Column(name="image_url")
    private String imageUrl;
}
