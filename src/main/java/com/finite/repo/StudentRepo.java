package com.finite.repo;

import com.finite.model.Student;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentRepo {

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
