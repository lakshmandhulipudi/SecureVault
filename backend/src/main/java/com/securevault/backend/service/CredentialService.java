package com.securevault.backend.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.securevault.backend.dto.CredentialRequest;
import com.securevault.backend.entity.Credential;
import com.securevault.backend.entity.CredentialShare;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.CredentialRepository;
import com.securevault.backend.repository.CredentialShareRepository;
import com.securevault.backend.repository.UserRepository;
import com.securevault.backend.utils.AESUtil;

@Service
public class CredentialService {

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final CredentialShareRepository credentialShareRepository;

    public CredentialService(
            CredentialRepository credentialRepository,
            UserRepository userRepository,
            CredentialShareRepository credentialShareRepository) {

        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.credentialShareRepository = credentialShareRepository;
    }

    // Add Credential
    public Credential addCredential(
            String email,
            CredentialRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Credential credential = new Credential();

        credential.setWebsite(request.getWebsite());
        credential.setUsername(request.getUsername());

        // Encrypt password before storing
        credential.setPassword(
                AESUtil.encrypt(request.getPassword())
        );

        credential.setCategory(request.getCategory());
        credential.setFavourite(request.isFavourite());
        credential.setUser(user);

        return credentialRepository.save(credential);
    }

    // View Own + Shared Credentials
    public List<Credential> getCredentials(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Own credentials
        List<Credential> ownCredentials =
                credentialRepository.findByUser(user);

        // Shared credentials
        List<CredentialShare> shares =
                credentialShareRepository.findBySharedWithUser(user);

        /*
         * LinkedHashMap prevents duplicate credentials
         * while maintaining the original order.
         */
        Map<Long, Credential> credentialMap =
                new LinkedHashMap<>();

        for (Credential credential : ownCredentials) {
            credentialMap.put(
                    credential.getId(),
                    credential
            );
        }

        for (CredentialShare share : shares) {

            Credential credential =
                    share.getCredential();

            if (credential != null) {

                credentialMap.put(
                        credential.getId(),
                        credential
                );
            }
        }

        List<Credential> credentials =
                new ArrayList<>(credentialMap.values());

        // Decrypt passwords only for response
        for (Credential credential : credentials) {

            credential.setPassword(
                    AESUtil.decrypt(
                            credential.getPassword()
                    )
            );
        }

        return credentials;
    }

    // Share Credential
    public void shareCredential(
            Long credentialId,
            String ownerEmail,
            Long recipientUserId) {

        // Find owner
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Owner user not found"
                        ));

        // Find credential
        Credential credential =
                credentialRepository.findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                ));

        // Make sure credential belongs to owner
        if (!credential.getUser().getId()
                .equals(owner.getId())) {

            throw new RuntimeException(
                    "You can share only your own credentials"
            );
        }

        // Find recipient
        User recipient =
                userRepository.findById(recipientUserId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Recipient user is not registered"
                                ));

        // Cannot share with yourself
        if (owner.getId().equals(recipient.getId())) {

            throw new RuntimeException(
                    "You cannot share a credential with yourself"
            );
        }

        // Prevent duplicate sharing
        boolean alreadyShared =
                credentialShareRepository
                        .existsByCredentialAndSharedWithUser(
                                credential,
                                recipient
                        );

        if (alreadyShared) {

            throw new RuntimeException(
                    "Credential is already shared with this user"
            );
        }

        // Create sharing record
        CredentialShare share =
                new CredentialShare();

        share.setCredential(credential);
        share.setOwner(owner);
        share.setSharedWithUser(recipient);

        credentialShareRepository.save(share);
    }

    // Delete Credential
    public void deleteCredential(Long id) {

        Credential credential =
                credentialRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                ));

        // Remove sharing records first
        credentialShareRepository
                .deleteByCredential(credential);

        // Then delete credential
        credentialRepository.delete(credential);
    }

    // Update Credential
    public Credential updateCredential(
            Long id,
            CredentialRequest request) {

        Credential credential =
                credentialRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                ));

        credential.setWebsite(request.getWebsite());
        credential.setUsername(request.getUsername());

        // Encrypt updated password
        credential.setPassword(
                AESUtil.encrypt(request.getPassword())
        );

        credential.setCategory(request.getCategory());
        credential.setFavourite(request.isFavourite());

        Credential updatedCredential =
                credentialRepository.save(credential);

        // Decrypt before sending response
        updatedCredential.setPassword(
                AESUtil.decrypt(
                        updatedCredential.getPassword()
                )
        );

        return updatedCredential;
    }
}