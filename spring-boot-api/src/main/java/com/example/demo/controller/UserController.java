package com.example.demo.controller;

import com.example.demo.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    private final List<User> users = Arrays.asList(
        new User(1L, "John Doe", "john.doe@example.com", "+1-555-0101"),
        new User(2L, "Jane Smith", "jane.smith@example.com", "+1-555-0102"),
        new User(3L, "Bob Johnson", "bob.johnson@example.com", "+1-555-0103"),
        new User(4L, "Alice Brown", "alice.brown@example.com", "+1-555-0104"),
        new User(5L, "Charlie Wilson", "charlie.wilson@example.com", "+1-555-0105")
    );
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            logger.info("Fetching all users");
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error occurred while fetching users: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}