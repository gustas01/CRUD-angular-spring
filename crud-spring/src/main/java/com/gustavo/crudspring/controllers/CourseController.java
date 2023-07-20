package com.gustavo.crudspring.controllers;

import com.gustavo.crudspring.DTOs.CourseDTO;
import com.gustavo.crudspring.repository.CourseRepository;
import com.gustavo.crudspring.services.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Validated
@RequestMapping("/api/courses")
public class CourseController {

  private final CourseService courseService;

  public CourseController(CourseRepository courseRepository, CourseService courseService) {
    this.courseService = courseService;
  }

  @GetMapping
  public List<CourseDTO> index() {
    return courseService.index();
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public CourseDTO create(@RequestBody @Valid CourseDTO course) {
    return courseService.create(course);
  }

  //  outra forma de fazer o create acima, porém com a possibilidade de personalizar  a resposta, como os headers
//  @PostMapping
//  public ResponseEntity<Course> create(@RequestBody Course course) {
//    return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
//  }

  @GetMapping("/{id}")
  public CourseDTO findById(@PathVariable @Positive @NotNull Long id) {
    return courseService.findById(id);
  }

  @PutMapping("/{id}")
  public CourseDTO update(@PathVariable @Positive @NotNull Long id, @RequestBody @Valid @NotNull CourseDTO course){
    return courseService.update(id, course);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable @Positive @NotNull Long id){
   courseService.delete(id);
  }




}
