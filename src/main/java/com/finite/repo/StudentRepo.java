package com.finite.repo;

import com.finite.model.Student;
import com.finite.model.StudentCourse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class StudentRepo {

    private final JdbcTemplate jdbcTemplate;

    public List<Student> getStudents() {
        return jdbcTemplate.query(
                "SELECT id, first_name, age FROM student",
                mapStudentFromDb()
        );
    }

    public void createStudent(UUID id, Student student) {
        jdbcTemplate.update(
                "INSERT INTO student (id, first_name, age) VALUES (?, ?, ?)",
                id, student.getFirstName(), student.getAge()
        );
    }

    public boolean isFirstNameTaken(String firstName) {
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(
                "SELECT EXISTS (SELECT 1 FROM student WHERE first_name = ?)",
                (resultSet, i) -> resultSet.getBoolean(1),
                firstName
        ));
    }

    public List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return jdbcTemplate.query(
                "SELECT " +
                        "student.id AS student_id, " +
                        "course.id AS course_id, " +
                        "course.name," +
                        "course.description, " +
                        "course.department, " +
                        "course.teacher, " +
                        "student_course.start_date, " +
                        "student_course.end_date, " +
                        "student_course.grade " +
                        "FROM student " +
                        "JOIN student_course ON student.id = student_course.student_id " +
                        "JOIN course ON course.id = student_course.course_id " +
                        "WHERE student.id = ?",
                mapStudentCourseFromDb(),
                studentId
        );
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> Student.builder()
                .id(UUID.fromString(resultSet.getString("id")))
                .firstName(resultSet.getString("first_name"))
                .age(resultSet.getInt("age"))
                .build();
    }

    private RowMapper<StudentCourse> mapStudentCourseFromDb() {
        return (resultSet, i) -> StudentCourse.builder()
                .studentId(UUID.fromString(resultSet.getString("student_id")))
                .courseId(UUID.fromString(resultSet.getString("course_id")))
                .name(resultSet.getString("name"))
                .description(resultSet.getString("description"))
                .department(resultSet.getString("department"))
                .teacher(resultSet.getString("teacher"))
                .startDate(resultSet.getDate("start_date").toLocalDate())
                .endDate(resultSet.getDate("end_date").toLocalDate())
                .grade(resultSet.getInt("grade"))
                .build();
    }
}
