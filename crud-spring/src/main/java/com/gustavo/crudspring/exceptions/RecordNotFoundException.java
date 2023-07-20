package com.gustavo.crudspring.exceptions;

public class RecordNotFoundException extends RuntimeException{
  private static final long serialVersionUID = 1L;
  public RecordNotFoundException(Long id) {
    super("Registro com id = " + id + " não encontrado");
  }
}
