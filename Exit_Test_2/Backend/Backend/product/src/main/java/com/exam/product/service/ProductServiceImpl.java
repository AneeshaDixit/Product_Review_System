package com.exam.product.service;

import com.exam.product.exception.NoProductExistInRepository;
import com.exam.product.model.Product;
import com.exam.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() throws NoProductExistInRepository {
        List<Product> all = productRepository.findAll();

        if (all.isEmpty()) {
            throw new NoProductExistInRepository();
        } else {
            return productRepository.findAll();
        }
    }

    @Override
    public Product add1(Product product) {
        return productRepository.save(product);
    }


    @Override
    public Product getProductsById(int id) throws NoProductExistInRepository {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) {
            throw new NoProductExistInRepository();
        } else {
            return product.get();
        }
    }

    @Override
    public HashSet<Product> getProductsByName(String name) throws NoProductExistInRepository {
        HashSet<Product> products = productRepository.getProductsByProductName(name);
        if (products.isEmpty()) {
            throw new NoProductExistInRepository();
        } else {
            return products;
        }
    }

    @Override
    public HashSet<Product> getProductsByBrand(String brand) throws NoProductExistInRepository {
        HashSet<Product> products = productRepository.getProductsByBrand(brand);
        if (products.isEmpty()) {
            throw new NoProductExistInRepository();
        } else {
            return products;
        }
    }

    @Override
    public HashSet<Product> getProductsByNameAndBrand(String productName, String brand) throws NoProductExistInRepository {
        HashSet<Product> produ = productRepository.getProductsByProductNameAndBrand(productName, brand);
        if (produ.isEmpty()) {
            throw new NoProductExistInRepository();
        } else {
            return produ;
        }
    }


}
