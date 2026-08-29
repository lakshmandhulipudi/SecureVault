package com.securevault.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.securevault.backend.dto.LoginActivityReportResponse;
import com.securevault.backend.dto.PasswordHealthResponse;
import com.securevault.backend.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin("*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(
            ReportService reportService) {

        this.reportService = reportService;
    }

    // ==========================================
    // PASSWORD HEALTH REPORT
    // ==========================================

    @GetMapping("/password-health")
    public ResponseEntity<PasswordHealthResponse>
            getPasswordHealthReport(
                    @RequestParam String email) {

        return ResponseEntity.ok(
                reportService.getPasswordHealthReport(
                        email
                )
        );
    }


    // ==========================================
    // LOGIN ACTIVITY REPORT
    // ==========================================

    @GetMapping("/login-activity")
    public ResponseEntity<LoginActivityReportResponse>
            getLoginActivityReport(
                    @RequestParam String email) {

        return ResponseEntity.ok(
                reportService.getLoginActivityReport(
                        email
                )
        );
    }

}