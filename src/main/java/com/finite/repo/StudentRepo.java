package com.finite.repo;

import com.finite.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentRepo {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> getStudents() {
        return jdbcTemplate.query(
                "SELECT id, first_name, age FROM student",
                mapStudentFromDb()
        );
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            UUID id = UUID.fromString(resultSet.getString("id"));
            String firstName = resultSet.getString("first_name");
            int age = resultSet.getInt("age");
            return Student.builder()
                    .id(id)
                    .firstName(firstName)
                    .age(age)
                    .build();
        };
    }
}
