package com.securevault.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.securevault.backend.dto.CredentialRequest;
import com.securevault.backend.entity.Credential;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.CredentialRepository;
import com.securevault.backend.repository.UserRepository;

@Service
public class CredentialService {

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;

    public CredentialService(CredentialRepository credentialRepository,
                             UserRepository userRepository) {

        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
    }

    // Add Credential
    public Credential addCredential(String email,
                                    CredentialRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Credential credential = new Credential();

        credential.setWebsite(request.getWebsite());
        credential.setUsername(request.getUsername());
        credential.setPassword(request.getPassword());
        credential.setCategory(request.getCategory());
        credential.setFavourite(request.isFavourite());
        credential.setUser(user);

        return credentialRepository.save(credential);
    }

    // View Credentials
    public List<Credential> getCredentials(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return credentialRepository.findByUser(user);
    }

    // Delete Credential
    public void deleteCredential(Long id) {

        credentialRepository.deleteById(id);

    }

    // Update Credential
    public Credential updateCredential(Long id,
                                       CredentialRequest request) {

        Credential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Credential not found"));

        credential.setWebsite(request.getWebsite());
        credential.setUsername(request.getUsername());
        credential.setPassword(request.getPassword());
        credential.setCategory(request.getCategory());
        credential.setFavourite(request.isFavourite());

        return credentialRepository.save(credential);
    }

}