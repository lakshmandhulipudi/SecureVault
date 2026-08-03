package com.securevault.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.securevault.backend.dto.LoginRequest;
import com.securevault.backend.dto.LoginResponse;
import com.securevault.backend.dto.RegisterRequest;
import com.securevault.backend.dto.ResetPasswordRequest;
import com.securevault.backend.entity.Otp;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.OtpRepository;
import com.securevault.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpRepository otpRepository;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       OtpRepository otpRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpRepository = otpRepository;
    }

    // Register User
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    // Login User
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                "Login Successful",
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    // Reset Password
    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Otp otp = otpRepository.findTopByEmailOrderByIdDesc(request.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (!otp.isVerified()) {
            throw new RuntimeException("OTP not verified");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        otpRepository.delete(otp);

        return "Password Reset Successful";
    }
}