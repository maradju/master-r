package com.masterrad.schoolbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="professor")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id")
public class Professor{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="about")
    private String about;

    @Column(name="mobile")
    private String mobile ;

    @Column(name="email")
    private String email;

    @Column(name="image_url")
    private String imageUrl;


}
