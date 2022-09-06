package com.finite.service;

import com.finite.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

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
