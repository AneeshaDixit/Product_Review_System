package com.exam.product.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long pid;
    private String productName;
    private String description;
    private String brand;
    private int price;
    private int pinCode[];
    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;

    public Product() {
    }

    public Product(Long pid, String productName, String description, String brand, int price, int[] pinCode, String image) {
        this.pid = pid;
        this.productName = productName;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.pinCode = pinCode;
        this.image = image;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int[] getPinCode() {
        return pinCode;
    }

    public void setPinCode(int[] pinCode) {
        this.pinCode = pinCode;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
