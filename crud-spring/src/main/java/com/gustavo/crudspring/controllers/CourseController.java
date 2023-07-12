package com.gustavo.crudspring.controllers;

import com.gustavo.crudspring.models.Course;
import com.gustavo.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/courses")
public class CourseController {

  private final CourseRepository courseRepository;

  @GetMapping
  public List<Course> index() {
    return courseRepository.findAll();
  }
}
