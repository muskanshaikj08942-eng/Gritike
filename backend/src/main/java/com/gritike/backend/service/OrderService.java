package com.gritike.backend.service;

import com.gritike.backend.dto.OrderItemRequest;
import com.gritike.backend.dto.OrderRequest;
import com.gritike.backend.entity.Order;
import com.gritike.backend.entity.OrderItem;
import com.gritike.backend.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {

        this.orderRepository = orderRepository;

    }

    // =====================================================
    // CREATE ORDER
    // =====================================================

    public Order createOrder(OrderRequest request) {

        Order order = new Order();

        order.setEmail(request.getEmail());

        order.setFirstName(request.getFirstName());

        order.setLastName(request.getLastName());

        order.setAddress(request.getAddress());

        order.setCity(request.getCity());

        order.setState(request.getState());

        order.setPinCode(request.getPinCode());

        order.setPhone(request.getPhone());

        order.setPaymentMethod(request.getPaymentMethod());

        order.setTotalAmount(request.getTotalAmount());

        order.setStatus("PLACED");


        // =================================================
        // ADD ORDER ITEMS
        // =================================================

        if (request.getItems() != null) {

            for (OrderItemRequest itemRequest : request.getItems()) {

                OrderItem item = new OrderItem();

                item.setProductId(
                        itemRequest.getProductId()
                );

                item.setProductName(
                        itemRequest.getProductName()
                );

                item.setImageUrl(
                        itemRequest.getImageUrl()
                );

                item.setSelectedSize(
                        itemRequest.getSelectedSize()
                );

                item.setQuantity(
                        itemRequest.getQuantity()
                );

                item.setPrice(
                        itemRequest.getPrice()
                );

                // Connect item to order
                order.addItem(item);
            }
        }


        // =================================================
        // SAVE ORDER
        // =================================================

        return orderRepository.save(order);
    }


    // =====================================================
    // GET USER ORDERS
    // =====================================================

    public List<Order> getOrdersByEmail(String email) {

        return orderRepository.findByEmail(email);

    }


    // =====================================================
    // GET SINGLE ORDER
    // =====================================================

    public Order getOrderById(Long id) {

        return orderRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order #" + id + " was not found."
                        )
                );

    }


    // =====================================================
    // GET ALL ORDERS
    // =====================================================

    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }

}