package com.gustavo.crudspring.controllers;

import com.gustavo.crudspring.models.Course;
import com.gustavo.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Course create(@RequestBody Course course) {
    return courseRepository.save(course);
  }

  //  outra forma de fazer o create acima, porém com a possibilidade de personalizar  a resposta, como os headers
//  @PostMapping
//  public ResponseEntity<Course> create(@RequestBody Course course) {
//    return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
//  }

  @GetMapping("/{id}")
  public ResponseEntity<Course> findById(@PathVariable long id) {
    return courseRepository.findById(id)
            .map(record -> ResponseEntity.ok().body(record))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Course> update(@PathVariable long id, @RequestBody Course course){
    return courseRepository.findById(id).map(record -> ResponseEntity.ok(courseRepository.save(course)))
            .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable long id){
    return courseRepository.findById(id).map(record -> {
      courseRepository.deleteById(id);
      return ResponseEntity.noContent().<Void>build();
    }).orElse(ResponseEntity.notFound().build());
  }




}
