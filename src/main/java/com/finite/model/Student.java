package com.finite.model;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class Student {

    private final UUID id;
    private final String firstName;
    private final int age;
}
