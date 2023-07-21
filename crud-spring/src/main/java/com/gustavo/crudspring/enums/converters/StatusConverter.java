package com.gustavo.crudspring.enums.converters;

import com.gustavo.crudspring.enums.Category;
import com.gustavo.crudspring.enums.Status;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.SneakyThrows;

import java.util.stream.Stream;

  @Converter(autoApply = true)
  public class StatusConverter implements AttributeConverter<Status, String> {
    @Override
    public String convertToDatabaseColumn(Status category) {
      if(category == null)
        return null;
      return category.getValue();
    }

    @SneakyThrows
    @Override
    public Status convertToEntityAttribute(String s) {
      if(s == null)
        return null;
      return Stream.of(Status.values()).filter(c -> c.getValue().equals(s))
              .findFirst().orElseThrow(IllegalAccessException::new);
    }
  }
