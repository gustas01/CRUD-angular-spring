package com.gustavo.crudspring.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gustavo.crudspring.enums.Category;
import com.gustavo.crudspring.enums.converters.CategoryConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?")
@Where(clause = "status = 'Ativo'")
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonProperty("_id")
  private long id;

  @NotNull
  @NotBlank
  @Length(min = 5, max = 100)
  @Column(length = 100, nullable = false)
  private String name;

  @NotNull
  @Column(length = 10, nullable = false)
  @Convert(converter = CategoryConverter.class)
  private Category category;

  @NotNull
  @Length(max = 10)
  @Pattern(regexp = "Ativo|Inativo")
  @Column(length = 10, nullable = false)
  private String status = "Ativo";
}
