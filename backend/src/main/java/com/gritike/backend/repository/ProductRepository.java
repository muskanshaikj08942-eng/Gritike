package com.gritike.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gritike.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}