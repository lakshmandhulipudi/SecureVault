package com.securevault.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.securevault.backend.dto.SecurityAnalyticsResponse;
import com.securevault.backend.service.SecurityAnalyticsService;

@RestController
@RequestMapping("/api/security-analytics")
@CrossOrigin("*")
public class SecurityAnalyticsController {

    private final SecurityAnalyticsService securityAnalyticsService;

    public SecurityAnalyticsController(
            SecurityAnalyticsService securityAnalyticsService) {

        this.securityAnalyticsService =
                securityAnalyticsService;
    }

    // Get security analytics for a specific user
    @GetMapping
    public ResponseEntity<SecurityAnalyticsResponse> getAnalytics(
            @RequestParam String email) {

        return ResponseEntity.ok(
                securityAnalyticsService.getAnalytics(email)
        );
    }

    // Get security analytics for all users
    @GetMapping("/all")
    public ResponseEntity<SecurityAnalyticsResponse> getAllAnalytics() {

        return ResponseEntity.ok(
                securityAnalyticsService.getAllAnalytics()
        );
    }
}