package com.finite.controller;

import com.finite.model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getStudents() {
        return List.of(
                Student.builder()
                        .id(UUID.randomUUID())
                        .firstName("John")
                        .age(28)
                        .build(),
                Student.builder()
                        .id(UUID.randomUUID())
                        .firstName("Jack")
                        .age(22)
                        .build()
        );
    }
}
