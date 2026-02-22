package com.example.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
class UserControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @Test
    void getAllUsers_IntegrationTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("John Doe")))
                .andExpect(jsonPath("$[0].email", is("john.doe@example.com")))
                .andExpect(jsonPath("$[0].phone", is("+1-555-0101")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Jane Smith")))
                .andExpect(jsonPath("$[1].email", is("jane.smith@example.com")))
                .andExpect(jsonPath("$[1].phone", is("+1-555-0102")))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].name", is("Bob Johnson")))
                .andExpect(jsonPath("$[2].email", is("bob.johnson@example.com")))
                .andExpect(jsonPath("$[2].phone", is("+1-555-0103")))
                .andExpect(jsonPath("$[3].id", is(4)))
                .andExpect(jsonPath("$[3].name", is("Alice Brown")))
                .andExpect(jsonPath("$[3].email", is("alice.brown@example.com")))
                .andExpect(jsonPath("$[3].phone", is("+1-555-0104")))
                .andExpect(jsonPath("$[4].id", is(5)))
                .andExpect(jsonPath("$[4].name", is("Charlie Wilson")))
                .andExpect(jsonPath("$[4].email", is("charlie.wilson@example.com")))
                .andExpect(jsonPath("$[4].phone", is("+1-555-0105")));
    }

    @Test
    void getAllUsers_ResponseStructureTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0]").exists())
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[0].email").exists())
                .andExpect(jsonPath("$[0].phone").exists())
                .andExpect(jsonPath("$[0].id", isA(Number.class)))
                .andExpect(jsonPath("$[0].name", isA(String.class)))
                .andExpect(jsonPath("$[0].email", isA(String.class)))
                .andExpect(jsonPath("$[0].phone", isA(String.class)));
    }

    @Test
    void getAllUsers_ContentTypeTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllUsers_InvalidEndpointTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/user")  // Invalid endpoint
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is5xxServerError());
    }

    @Test
    void getAllUsers_InvalidMethodTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is5xxServerError());
    }

    @Test
    void getAllUsers_InvalidAcceptHeaderTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/users")
                .accept(MediaType.TEXT_XML))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }
}