package com.securevault.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.securevault.backend.dto.CredentialRequest;
import com.securevault.backend.entity.Credential;
import com.securevault.backend.service.CredentialService;

@RestController
@RequestMapping("/api/credentials")
@CrossOrigin("*")
public class CredentialController {

    private final CredentialService credentialService;

    public CredentialController(
            CredentialService credentialService) {

        this.credentialService = credentialService;
    }

    // Add Credential
    @PostMapping
    public ResponseEntity<Credential> addCredential(
            @RequestParam String email,
            @RequestBody CredentialRequest request) {

        return ResponseEntity.ok(
                credentialService.addCredential(
                        email,
                        request
                )
        );
    }

    // Get Own + Shared Credentials
    @GetMapping
    public ResponseEntity<List<Credential>> getCredentials(
            @RequestParam String email) {

        return ResponseEntity.ok(
                credentialService.getCredentials(email)
        );
    }

    // Share Credential
    @PostMapping("/{id}/share")
    public ResponseEntity<String> shareCredential(
            @PathVariable Long id,
            @RequestParam String ownerEmail,
            @RequestParam Long recipientUserId) {

        try {

            credentialService.shareCredential(
                    id,
                    ownerEmail,
                    recipientUserId
            );

            return ResponseEntity.ok(
                    "Credential shared successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // Delete Credential
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCredential(
            @PathVariable Long id) {

        credentialService.deleteCredential(id);

        return ResponseEntity.ok(
                "Credential Deleted Successfully"
        );
    }

    // Update Credential
    @PutMapping("/{id}")
    public ResponseEntity<Credential> updateCredential(
            @PathVariable Long id,
            @RequestBody CredentialRequest request) {

        return ResponseEntity.ok(
                credentialService.updateCredential(
                        id,
                        request
                )
        );
    }
}