package com.gritike.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gritike.backend.entity.Message;
import com.gritike.backend.service.MessageService;
@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5174")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // =========================================
    // SEND MESSAGE
    // =========================================

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestBody Message message) {

        Message savedMessage =
                messageService.sendMessage(message);

        return ResponseEntity.ok(savedMessage);
    }

    // =========================================
    // GET ALL MESSAGES
    // =========================================

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {

        return ResponseEntity.ok(
                messageService.getAllMessages()
        );
    }

    // =========================================
    // GET MESSAGE BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    messageService.getMessageById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================================
    // MARK AS READ
    // =========================================

    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    messageService.markAsRead(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================================
    // MARK AS UNREAD
    // =========================================

    @PutMapping("/{id}/unread")
    public ResponseEntity<Message> markAsUnread(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    messageService.markAsUnread(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================================
    // DELETE MESSAGE
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(
            @PathVariable Long id) {

        try {

            messageService.deleteMessage(id);

            return ResponseEntity.ok(
                    "Message deleted successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================================
    // UNREAD MESSAGE COUNT
    // =========================================

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(
                messageService.getUnreadCount()
        );
    }
}