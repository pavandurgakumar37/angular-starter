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
class ProductControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @Test
    void getAllProducts_IntegrationTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/products")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Laptop")))
                .andExpect(jsonPath("$[0].description", is("High-performance laptop with 16GB RAM and 512GB SSD")))
                .andExpect(jsonPath("$[0].price", is(1299.99)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Smartphone")))
                .andExpect(jsonPath("$[1].description", is("Latest smartphone with 5G connectivity and 128GB storage")))
                .andExpect(jsonPath("$[1].price", is(899.99)))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].name", is("Headphones")))
                .andExpect(jsonPath("$[2].description", is("Wireless noise-cancelling headphones with 30-hour battery life")))
                .andExpect(jsonPath("$[2].price", is(249.99)))
                .andExpect(jsonPath("$[3].id", is(4)))
                .andExpect(jsonPath("$[3].name", is("Smartwatch")))
                .andExpect(jsonPath("$[3].description", is("Fitness tracking smartwatch with heart rate monitor")))
                .andExpect(jsonPath("$[3].price", is(199.99)))
                .andExpect(jsonPath("$[4].id", is(5)))
                .andExpect(jsonPath("$[4].name", is("Tablet")))
                .andExpect(jsonPath("$[4].description", is("10-inch tablet with stylus support and 64GB storage")))
                .andExpect(jsonPath("$[4].price", is(449.99)));
    }

    @Test
    void getAllProducts_ResponseStructureTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/products")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0]").exists())
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[0].description").exists())
                .andExpect(jsonPath("$[0].price").exists())
                .andExpect(jsonPath("$[0].id", isA(Number.class)))
                .andExpect(jsonPath("$[0].name", isA(String.class)))
                .andExpect(jsonPath("$[0].description", isA(String.class)))
                .andExpect(jsonPath("$[0].price", isA(Number.class)));
    }

    @Test
    void getAllProducts_ContentTypeTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/products")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllProducts_InvalidEndpointTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/product")  // Invalid endpoint
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is5xxServerError());
    }

    @Test
    void getAllProducts_InvalidMethodTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/products")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is5xxServerError());
    }

    @Test
    void getAllProducts_InvalidAcceptHeaderTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/products")
                .accept(MediaType.TEXT_XML))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    void getAllProducts_PriceValidationTest() throws Exception {
        // Setup
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();

        // When & Then
        this.mockMvc.perform(get("/api/products")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].price", greaterThan(1000.0)))
                .andExpect(jsonPath("$[1].price", greaterThan(800.0)))
                .andExpect(jsonPath("$[2].price", greaterThan(200.0)))
                .andExpect(jsonPath("$[3].price", greaterThan(100.0)))
                .andExpect(jsonPath("$[4].price", greaterThan(400.0)));
    }
}