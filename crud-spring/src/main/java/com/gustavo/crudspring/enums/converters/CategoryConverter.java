package com.gustavo.crudspring.enums.converters;

import com.gustavo.crudspring.enums.Category;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.SneakyThrows;

import java.util.Arrays;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class CategoryConverter implements AttributeConverter<Category, String> {
  @Override
  public String convertToDatabaseColumn(Category category) {
    if(category == null)
      return null;
    return category.getValue();
  }

  @SneakyThrows
  @Override
  public Category convertToEntityAttribute(String s) {
    if(s == null)
      return null;
    return Stream.of(Category.values()).filter(c -> c.getValue().equals(s))
            .findFirst().orElseThrow(IllegalAccessException::new);
  }
}
