package com.example.demo.controller;

import com.example.demo.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    
    private final List<Product> products = Arrays.asList(
        new Product(1L, "Laptop", "High-performance laptop with 16GB RAM and 512GB SSD", 1299.99),
        new Product(2L, "Smartphone", "Latest smartphone with 5G connectivity and 128GB storage", 899.99),
        new Product(3L, "Headphones", "Wireless noise-cancelling headphones with 30-hour battery life", 249.99),
        new Product(4L, "Smartwatch", "Fitness tracking smartwatch with heart rate monitor", 199.99),
        new Product(5L, "Tablet", "10-inch tablet with stylus support and 64GB storage", 449.99)
    );
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            logger.info("Fetching all products");
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            logger.error("Error occurred while fetching products: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}