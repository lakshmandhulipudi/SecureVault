package com.securevault.backend.service;

import org.springframework.stereotype.Service;

import com.securevault.backend.entity.Credential;
import com.securevault.backend.entity.CredentialShare;
import com.securevault.backend.entity.Permission;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.CredentialRepository;
import com.securevault.backend.repository.CredentialShareRepository;
import com.securevault.backend.repository.UserRepository;

@Service
public class CredentialShareService {

    private final CredentialRepository credentialRepository;
    private final CredentialShareRepository credentialShareRepository;
    private final UserRepository userRepository;

    public CredentialShareService(
            CredentialRepository credentialRepository,
            CredentialShareRepository credentialShareRepository,
            UserRepository userRepository) {

        this.credentialRepository = credentialRepository;
        this.credentialShareRepository = credentialShareRepository;
        this.userRepository = userRepository;
    }

    public void shareCredential(
            Long credentialId,
            String ownerEmail,
            String recipientEmail,
            Permission permission) {

        // Find owner
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner not found"));

        // Find credential
        Credential credential =
                credentialRepository.findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException("Credential not found"));

        // Verify credential belongs to owner
        if (!credential.getUser().getId()
                .equals(owner.getId())) {

            throw new RuntimeException(
                    "You are not authorized to share this credential");
        }

        // Find recipient using email
        User recipient =
                userRepository.findByEmail(recipientEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Recipient email is not registered in SecureVault"));

        // Prevent sharing with yourself
        if (owner.getId().equals(recipient.getId())) {

            throw new RuntimeException(
                    "You cannot share a credential with yourself");
        }

        // Prevent duplicate sharing
        boolean alreadyShared =
                credentialShareRepository
                        .existsByCredentialAndSharedWithUser(
                                credential,
                                recipient);

        if (alreadyShared) {

            throw new RuntimeException(
                    "Credential is already shared with this user");
        }

        // Create share record
        CredentialShare credentialShare =
                new CredentialShare();

        credentialShare.setCredential(credential);
        credentialShare.setOwner(owner);
        credentialShare.setSharedWithUser(recipient);

        // Assign permission
        credentialShare.setPermission(permission);

        // Save share record
        credentialShareRepository.save(credentialShare);
    }
}