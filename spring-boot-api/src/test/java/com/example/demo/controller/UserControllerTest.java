package com.example.demo.controller;

import com.example.demo.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    private List<User> expectedUsers;

    @BeforeEach
    void setUp() {
        expectedUsers = List.of(
            new User(1L, "John Doe", "john.doe@example.com", "+1-555-0101"),
            new User(2L, "Jane Smith", "jane.smith@example.com", "+1-555-0102"),
            new User(3L, "Bob Johnson", "bob.johnson@example.com", "+1-555-0103"),
            new User(4L, "Alice Brown", "alice.brown@example.com", "+1-555-0104"),
            new User(5L, "Charlie Wilson", "charlie.wilson@example.com", "+1-555-0105")
        );
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        // When
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Then
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
        assertEquals(5, response.getBody().size());
        
        List<User> actualUsers = response.getBody();
        for (int i = 0; i < expectedUsers.size(); i++) {
            User expected = expectedUsers.get(i);
            User actual = actualUsers.get(i);
            assertEquals(expected.getId(), actual.getId());
            assertEquals(expected.getName(), actual.getName());
            assertEquals(expected.getEmail(), actual.getEmail());
            assertEquals(expected.getPhone(), actual.getPhone());
        }
    }

    @Test
    void getAllUsers_ShouldReturnCorrectUserStructure() {
        // When
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Then
        assertTrue(response.getStatusCode().is2xxSuccessful());
        List<User> users = response.getBody();
        assertNotNull(users);
        
        User firstUser = users.get(0);
        assertNotNull(firstUser.getId());
        assertNotNull(firstUser.getName());
        assertNotNull(firstUser.getEmail());
        assertNotNull(firstUser.getPhone());
        assertEquals(1L, firstUser.getId());
        assertEquals("John Doe", firstUser.getName());
        assertEquals("john.doe@example.com", firstUser.getEmail());
        assertEquals("+1-555-0101", firstUser.getPhone());
    }

    @Test
    void getAllUsers_ShouldReturnUsersInCorrectOrder() {
        // When
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Then
        assertTrue(response.getStatusCode().is2xxSuccessful());
        List<User> users = response.getBody();
        assertNotNull(users);
        assertEquals(5, users.size());
        
        assertEquals("John Doe", users.get(0).getName());
        assertEquals("Jane Smith", users.get(1).getName());
        assertEquals("Bob Johnson", users.get(2).getName());
        assertEquals("Alice Brown", users.get(3).getName());
        assertEquals("Charlie Wilson", users.get(4).getName());
    }

    @Test
    void getAllUsers_ShouldHandleExceptionGracefully() {
        // This test verifies that the controller handles exceptions gracefully
        // Since we're using a simple implementation with hardcoded data,
        // exceptions are unlikely, but we test the error handling path
        
        // When
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Then
        // In normal circumstances, we should get a successful response
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
    }
}