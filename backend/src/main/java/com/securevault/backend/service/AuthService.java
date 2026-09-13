package com.securevault.backend.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.securevault.backend.dto.LoginRequest;
import com.securevault.backend.dto.LoginResponse;
import com.securevault.backend.dto.RegisterRequest;
import com.securevault.backend.dto.ResetPasswordRequest;
import com.securevault.backend.entity.LoginActivity;
import com.securevault.backend.entity.LoginStatus;
import com.securevault.backend.entity.Otp;
import com.securevault.backend.entity.User;
import com.securevault.backend.repository.LoginActivityRepository;
import com.securevault.backend.repository.OtpRepository;
import com.securevault.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpRepository otpRepository;
    private final LoginActivityRepository loginActivityRepository;
    private final SuspiciousActivityService suspiciousActivityService;
    private final NotificationService notificationService;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            OtpRepository otpRepository,
            LoginActivityRepository loginActivityRepository,
            SuspiciousActivityService suspiciousActivityService,
            NotificationService notificationService,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpRepository = otpRepository;
        this.loginActivityRepository = loginActivityRepository;
        this.suspiciousActivityService = suspiciousActivityService;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    // Register User
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        if (userRepository.existsByUsername(request.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        return userRepository.save(user);
    }

    // Login User
    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        // User does not exist
        if (user == null) {

            saveLoginActivity(
                    null,
                    request.getEmail(),
                    LoginStatus.FAILED
            );

            // Cannot analyze using user-specific
            // suspicious activity because user does not exist.

            throw new RuntimeException(
                    "Invalid email"
            );
        }

        // Password is incorrect
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            // Step 1: Save failed login
            saveLoginActivity(
                    user,
                    user.getEmail(),
                    LoginStatus.FAILED
            );

            // Step 2: Analyze recent login activity
            suspiciousActivityService.analyzeActivity(
                    user.getEmail()
            );

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        // Login successful
        saveLoginActivity(
                user,
                user.getEmail(),
                LoginStatus.SUCCESS
        );

        // Create login notification
        notificationService.createNotification(
                user.getEmail(),
                "LOGIN",
                "New Login Detected",
                "New login detected on your SecureVault account."
        );

        // Send login notification email
        emailService.sendLoginNotificationEmail(
                user.getEmail(),
                user.getUsername()
        );

        // Analyze recent activity after successful login
        // This also allows the system to detect previous
        // repeated failed attempts.
        suspiciousActivityService.analyzeActivity(
                user.getEmail()
        );

        return new LoginResponse(
                "Login Successful",
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    // Save Login Activity
    private void saveLoginActivity(
            User user,
            String email,
            LoginStatus status) {

        LoginActivity activity =
                new LoginActivity();

        activity.setUser(user);
        activity.setEmail(email);
        activity.setStatus(status);
        activity.setTimestamp(
                LocalDateTime.now()
        );

        loginActivityRepository.save(activity);
    }

    // Reset Password
    public String resetPassword(
            ResetPasswordRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        Otp otp = otpRepository
                .findTopByEmailOrderByIdDesc(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "OTP not found"
                        )
                );

        if (!otp.isVerified()) {

            throw new RuntimeException(
                    "OTP not verified"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

        otpRepository.delete(otp);

        return "Password Reset Successful";
    }

    // Get Profile
    public User getProfile(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }
}