package com.exam.product.repository;

import com.exam.product.model.Product;
import com.exam.product.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	//Derived Query Methods / Custom Finder Methods......depending upon your method name it will generate a query
    HashSet<Product> getProductsByProductName(String name);

    HashSet<Product> getProductsByBrand(String brand);

    HashSet<Product> getProductsByProductNameAndBrand(String productName, String brand);
}
