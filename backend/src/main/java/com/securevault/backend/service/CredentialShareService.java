package com.securevault.backend.service;

import org.springframework.stereotype.Service;

import com.securevault.backend.entity.Credential;
import com.securevault.backend.entity.CredentialShare;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.CredentialRepository;
import com.securevault.backend.repository.CredentialShareRepository;
import com.securevault.backend.repository.UserRepository;

@Service
public class CredentialShareService {

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final CredentialShareRepository credentialShareRepository;

    public CredentialShareService(
            CredentialRepository credentialRepository,
            UserRepository userRepository,
            CredentialShareRepository credentialShareRepository) {

        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.credentialShareRepository = credentialShareRepository;
    }

    public void shareCredential(
            Long credentialId,
            String ownerEmail,
            Long recipientUserId) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException("Owner user not found"));

        Credential credential = credentialRepository.findById(credentialId)
                .orElseThrow(() ->
                        new RuntimeException("Credential not found"));

        // Make sure the credential belongs to the logged-in user
        if (!credential.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException(
                    "You can share only your own credentials");
        }

        User recipient = userRepository.findById(recipientUserId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recipient user is not registered"));

        // User cannot share with themselves
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

        CredentialShare share = new CredentialShare();

        share.setCredential(credential);
        share.setOwner(owner);
        share.setSharedWithUser(recipient);

        credentialShareRepository.save(share);
    }
}