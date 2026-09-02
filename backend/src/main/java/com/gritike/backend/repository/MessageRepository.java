package com.gritike.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gritike.backend.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Long countByReadFalse();

}