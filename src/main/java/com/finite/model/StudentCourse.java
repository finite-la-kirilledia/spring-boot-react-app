package com.finite.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class StudentCourse {

    private final UUID studentId;
    private final UUID courseId;
    private final String name;
    private final String description;
    private final String department;
    private final String teacher;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Integer grade;
}
