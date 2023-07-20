package com.gustavo.crudspring.services;

import com.gustavo.crudspring.exceptions.RecordNotFoundException;
import com.gustavo.crudspring.models.Course;
import com.gustavo.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class CourseService {
  private final CourseRepository courseRepository;

  public CourseService(CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
  }

  public List<Course> index() {
    return courseRepository.findAll();
  }

  public Course create(@Valid Course course) {
    return courseRepository.save(course);
  }

  public Course findById(@PathVariable @Positive @NotNull Long id) {
    return courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public Course update(@Positive @NotNull Long id, @Valid Course course){

    return courseRepository.findById(id).map(record -> {
      course.setId(record.getId());
      return courseRepository.save(course);
    }).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public void delete(@PathVariable @Positive @NotNull Long id){
    courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
  }
}
