package com.gustavo.crudspring.services;

import com.gustavo.crudspring.DTOs.CourseDTO;
import com.gustavo.crudspring.DTOs.mappers.CourseMapper;
import com.gustavo.crudspring.enums.Category;
import com.gustavo.crudspring.exceptions.RecordNotFoundException;
import com.gustavo.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class CourseService {
  private final CourseRepository courseRepository;
  private final CourseMapper courseMapper;

  public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
    this.courseRepository = courseRepository;
    this.courseMapper = courseMapper;
  }

  public List<CourseDTO> index() {
    return courseRepository.findAll().stream().map(courseMapper::toDTO).collect(Collectors.toList());
  }

  public CourseDTO create(@Valid @NotNull CourseDTO course) {
    return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
  }

  public CourseDTO findById(@Positive @NotNull Long id) {
    return courseRepository.findById(id).map(courseMapper::toDTO).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public CourseDTO update(@Positive @NotNull Long id, @Valid @NotNull CourseDTO course){

    return courseRepository.findById(id).map(record -> {
      record.setName(course.name());
      record.setCategory(courseMapper.convertCategoryValue(course.category()));
      return courseMapper.toDTO(courseRepository.save(record));
    }).orElseThrow(() -> new RecordNotFoundException(id));
  }

  public void delete(@Positive @NotNull Long id){
    courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
  }
}
