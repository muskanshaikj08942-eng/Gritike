package com.gritike.backend.repository;

import com.gritike.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // =========================================
    // GET ORDERS BY USER EMAIL
    // =========================================

    List<Order> findByEmail(String email);

    // =========================================
    // GET SINGLE ORDER BY ID
    // =========================================

    Optional<Order> findById(Long id);
}