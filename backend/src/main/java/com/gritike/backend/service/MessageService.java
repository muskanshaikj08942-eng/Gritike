package com.gritike.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gritike.backend.entity.Message;
import com.gritike.backend.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    // =========================================================
    // SEND MESSAGE
    // =========================================================

    public Message sendMessage(Message message) {

        message.setCreatedAtIfMissing();

        return messageRepository.save(message);
    }


    // =========================================================
    // GET ALL MESSAGES
    // =========================================================

    public List<Message> getAllMessages() {

        return messageRepository.findAll();
    }


    // =========================================================
    // GET MESSAGE BY ID
    // =========================================================

    public Message getMessageById(Long id) {

        return messageRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Message not found with id: " + id
                    )
                );
    }


    // =========================================================
    // UNREAD MESSAGE COUNT
    // =========================================================

    public Long getUnreadCount() {

        return messageRepository.countByReadFalse();
    }


    // =========================================================
    // MARK AS READ
    // =========================================================

    public Message markAsRead(Long id) {

        Message message = messageRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Message not found with id: " + id
                    )
                );

        message.setRead(true);

        return messageRepository.save(message);
    }


    // =========================================================
    // MARK AS UNREAD
    // =========================================================

    public Message markAsUnread(Long id) {

        Message message = messageRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Message not found with id: " + id
                    )
                );

        message.setRead(false);

        return messageRepository.save(message);
    }


    // =========================================================
    // DELETE MESSAGE
    // =========================================================

    public void deleteMessage(Long id) {

        if (!messageRepository.existsById(id)) {

            throw new RuntimeException(
                "Message not found with id: " + id
            );
        }

        messageRepository.deleteById(id);
    }

}