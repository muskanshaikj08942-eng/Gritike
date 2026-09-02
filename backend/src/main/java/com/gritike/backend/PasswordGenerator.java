
package com.gritike.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = "demo123";

        String storedHash =
                "$2a$10$2BNfy8RfZzQ02DYDz6CEVO5benOenGDAMNoo4omae9Fx7heVkvExu";

        boolean matches = encoder.matches(password, storedHash);

        System.out.println("Password matches: " + matches);
    }
}

