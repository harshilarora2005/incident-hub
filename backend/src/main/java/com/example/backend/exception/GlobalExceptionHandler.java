package com.example.backend.exception;

import com.example.backend.entity.ErrorDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomExceptionHandler.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFound(CustomExceptionHandler ex) {
        HttpStatus status = HttpStatus.NOT_FOUND; // 404 Status

        ErrorDetails errorDetails = new ErrorDetails(
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorDetails, status);
    }
}
