package com.finite.model;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@Builder
public class Student {

    private final UUID id;

    @NotBlank
    private final String firstName;

    @NotNull
    private final Integer age;
}
