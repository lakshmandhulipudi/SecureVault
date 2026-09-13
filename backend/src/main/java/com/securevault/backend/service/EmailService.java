package com.securevault.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ==========================================
    // Password reset OTP email
    // ==========================================

    public void sendOtpEmail(
            String toEmail,
            String otp) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "SecureVault Password Reset OTP"
        );

        message.setText(
                "Your SecureVault password reset OTP is: "
                        + otp
                        + "\n\n"
                        + "This OTP is valid for a limited time."
                        + "\n\n"
                        + "If you did not request a password reset, "
                        + "please ignore this email."
        );

        mailSender.send(message);
    }

    // ==========================================
    // Successful login notification email
    // ==========================================

    public void sendLoginNotificationEmail(
            String toEmail,
            String username) {

        LocalDateTime loginTime =
                LocalDateTime.now();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd-MM-yyyy HH:mm:ss"
                );

        String formattedTime =
                loginTime.format(formatter);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "SecureVault - New Login Detected"
        );

        message.setText(
                "Hello " + username + ",\n\n"
                        + "New login detected on your SecureVault account.\n\n"
                        + "Account: " + toEmail + "\n"
                        + "Login Date & Time: "
                        + formattedTime
                        + "\n\n"
                        + "If this login was not performed by you, "
                        + "please secure your account immediately."
                        + "\n\n"
                        + "Regards,\n"
                        + "SecureVault Security Team"
        );

        try {

            mailSender.send(message);

            System.out.println(
                    "Login notification email sent successfully to: "
                            + toEmail
            );

        } catch (MailException e) {

            System.err.println(
                    "Login notification email failed: "
                            + e.getMessage()
            );

            // Do not stop the login process
        }
    }

    // ==========================================
    // Security alert email
    // ==========================================

    public void sendSecurityAlertEmail(
            String toEmail,
            String username,
            String description) {

        LocalDateTime alertTime =
                LocalDateTime.now();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd-MM-yyyy HH:mm:ss"
                );

        String formattedTime =
                alertTime.format(formatter);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "SecureVault - Security Alert"
        );

        message.setText(
                "Hello " + username + ",\n\n"
                        + "Suspicious activity was detected "
                        + "on your SecureVault account.\n\n"
                        + "Security Event: "
                        + description
                        + "\n\n"
                        + "Date & Time: "
                        + formattedTime
                        + "\n"
                        + "Account: "
                        + toEmail
                        + "\n\n"
                        + "If this activity was not performed by you, "
                        + "please secure your account immediately "
                        + "and change your password.\n\n"
                        + "Regards,\n"
                        + "SecureVault Security Team"
        );

        try {

            mailSender.send(message);

            System.out.println(
                    "Security alert email sent successfully to: "
                            + toEmail
            );

        } catch (MailException e) {

            System.err.println(
                    "Security alert email failed: "
                            + e.getMessage()
            );

            // Do not stop the security detection process
        }
    }

    // ==========================================
    // Credential sharing notification email
    // ==========================================

    public void sendCredentialShareEmail(
            String toEmail,
            String recipientUsername,
            String ownerUsername,
            String permission) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "SecureVault - Credential Shared With You"
        );

        message.setText(
                "Hello " + recipientUsername + ",\n\n"
                        + "A credential has been shared with you "
                        + "on your SecureVault account.\n\n"
                        + "Shared by: "
                        + ownerUsername
                        + "\n"
                        + "Permission: "
                        + permission
                        + "\n\n"
                        + "For security reasons, the credential password "
                        + "is not included in this email.\n\n"
                        + "Please log in to SecureVault to access the "
                        + "shared credential.\n\n"
                        + "Regards,\n"
                        + "SecureVault Security Team"
        );

        try {

            mailSender.send(message);

            System.out.println(
                    "Credential sharing email sent successfully to: "
                            + toEmail
            );

        } catch (MailException e) {

            System.err.println(
                    "Credential sharing email failed: "
                            + e.getMessage()
            );

            // Do not stop the credential sharing process
        }
    }

    // ==========================================
    // Password expiration notification email
    // ==========================================

    public void sendPasswordExpirationEmail(
            String toEmail,
            String username,
            String website,
            boolean expired) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        // ==========================================
        // Password already expired
        // ==========================================

        if (expired) {

            message.setSubject(
                    "SecureVault - Password Expired"
            );

            message.setText(
                    "Hello " + username + ",\n\n"
                            + "The password for your credential "
                            + website
                            + " has expired.\n\n"
                            + "Please log in to SecureVault and "
                            + "update your password as soon as possible.\n\n"
                            + "For security reasons, your password "
                            + "is not included in this email.\n\n"
                            + "Regards,\n"
                            + "SecureVault Security Team"
            );

        }

        // ==========================================
        // Password expiring soon
        // ==========================================

        else {

            message.setSubject(
                    "SecureVault - Password Expiring Soon"
            );

            message.setText(
                    "Hello " + username + ",\n\n"
                            + "The password for your credential "
                            + website
                            + " will expire soon.\n\n"
                            + "Please log in to SecureVault and "
                            + "update your password before it expires.\n\n"
                            + "For security reasons, your password "
                            + "is not included in this email.\n\n"
                            + "Regards,\n"
                            + "SecureVault Security Team"
            );
        }

        try {

            mailSender.send(message);

            System.out.println(
                    "Password expiration email sent successfully to: "
                            + toEmail
            );

        } catch (MailException e) {

            System.err.println(
                    "Password expiration email failed: "
                            + e.getMessage()
            );

            // Do not stop the application process
        }
    }
}