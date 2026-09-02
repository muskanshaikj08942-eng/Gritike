package com.gritike.backend.controller;

import com.gritike.backend.dto.OrderRequest;
import com.gritike.backend.entity.Order;
import com.gritike.backend.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5174")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {

        this.orderService = orderService;

    }


    // =====================================================
    // CREATE ORDER
    // =====================================================

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest request) {

        try {

            Order order =
                    orderService.createOrder(request);

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }


    // =====================================================
    // GET SINGLE ORDER
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
            @PathVariable Long id) {

        try {

            Order order =
                    orderService.getOrderById(id);

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();

        }

    }


    // =====================================================
    // GET USER ORDERS
    // =====================================================

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(
            @RequestParam String email) {

        List<Order> orders =
                orderService.getOrdersByEmail(email);

        return ResponseEntity.ok(orders);

    }


    // =====================================================
    // GET ALL ORDERS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );

    }

}