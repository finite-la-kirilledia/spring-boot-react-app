package com.finite.service;

import com.finite.model.Student;
import com.finite.repo.StudentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepo studentRepo;

    public List<Student> getStudents() {
        return studentRepo.getStudents();
    }

    public void createStudent(Student student) {
        createStudent(null, student);
    }

    public void createStudent(UUID newStudentId, Student student) {
        UUID id = Optional.ofNullable(newStudentId).orElse(UUID.randomUUID());
        studentRepo.createStudent(id, student);
    }
}
