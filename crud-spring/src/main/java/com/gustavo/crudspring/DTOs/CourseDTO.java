package com.gustavo.crudspring.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CourseDTO(
        @JsonProperty("_id") long id,
        @NotNull @NotBlank @Length(min = 5, max = 100)String name,
        @NotNull @Length(max = 10) @Pattern(regexp = "Backend|Frontend") String category,
        List<LessonDTO> lessons
)
{}
