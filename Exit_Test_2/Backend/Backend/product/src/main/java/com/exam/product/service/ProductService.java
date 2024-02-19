package com.exam.product.service;

import com.exam.product.exception.NoProductExistInRepository;
import com.exam.product.model.Product;

import java.util.HashSet;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts() throws NoProductExistInRepository;
    HashSet<Product> getProductsByName(String name) throws NoProductExistInRepository;

    Product getProductsById(int id) throws NoProductExistInRepository;

    HashSet<Product> getProductsByBrand(String brand) throws NoProductExistInRepository;

    HashSet<Product> getProductsByNameAndBrand(String productName, String brand)  throws NoProductExistInRepository;

    Product add1(Product product);
}
