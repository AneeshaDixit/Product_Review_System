package com.exam.product.controller;

import com.exam.product.exception.NoProductExistInRepository;
import com.exam.product.exception.ProvideProperFileDetailException;
import com.exam.product.model.Product;
import com.exam.product.repository.ProductRepository;
import com.exam.product.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/check")
    public String check() {
        return "Working...!";
    }

    //    To get the all products
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            return new ResponseEntity<List<Product>>(productService.getAllProducts(), HttpStatus.OK);
        } catch (NoProductExistInRepository e) {
            return new ResponseEntity("List Not Found", HttpStatus.NOT_FOUND);
        }
    }

    //    To add new product
    @PostMapping("/add")
    public ResponseEntity<Product> add1(@RequestBody Product product) throws IOException {
        Product user = productService.add1(product);
        return new ResponseEntity<Product>(user, HttpStatus.OK);
    }

    //    To get the product by product id
    @GetMapping("/getProductsById/{id}")
    public ResponseEntity<Product> getProductsById(@PathVariable int id) {
        try {
            return new ResponseEntity<Product>(this.productService.getProductsById(id), HttpStatus.OK);
        } catch (NoProductExistInRepository e) {
            return new ResponseEntity("Product Not Found", HttpStatus.CONFLICT);
        }
    }

    //    To get the products by name
    @GetMapping("/getProductsByName/{name}")
    public ResponseEntity<?> getProductsByName(@PathVariable String name) {
        try {
            HashSet<Product> products = this.productService.getProductsByName(name);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NoProductExistInRepository e) {
            return new ResponseEntity<>("Product Not Found", HttpStatus.CONFLICT);
        }
    }

    //    To get the products by brand
    @GetMapping("/getProductsByBrand/{brand}")
    public ResponseEntity<?> getProductsByBrand(@PathVariable String brand) {
        try {
            HashSet<Product> products = this.productService.getProductsByBrand(brand);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NoProductExistInRepository e) {
            return new ResponseEntity<>("Product Not Found", HttpStatus.CONFLICT);
        }
    }

    //    To get the product by both name and brand
    @GetMapping("/getProductsByNameAndBrand")
    public ResponseEntity<?> getProductsByNameAndBrand(@RequestParam("productName") String productName, @RequestParam("brand") String brand) {
        try {
            HashSet<Product> recommendations = this.productService.getProductsByNameAndBrand(productName, brand);
            return new ResponseEntity<>(recommendations, HttpStatus.OK);
        } catch (NoProductExistInRepository e) {
            return new ResponseEntity("Product Not Found", HttpStatus.CONFLICT);
        }
    }

    // To check the availability of product by pin code and product id
    @GetMapping("/check-pincode/{productId}/{pincode}")
    public ResponseEntity<String> checkPincode(@PathVariable int productId, @PathVariable int pincode) {
        int[] pincodes = productRepository.findById(productId).get().getPinCode();

        if (pincodes != null && IntStream.of(pincodes).anyMatch(code -> code == pincode)) {
            return new ResponseEntity("Available", HttpStatus.OK);
        } else {
            return new ResponseEntity("Not available", HttpStatus.CONFLICT);
        }
    }


}
