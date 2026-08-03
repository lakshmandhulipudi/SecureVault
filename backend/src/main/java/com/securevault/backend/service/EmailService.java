package com.securevault.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("SecureVault Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                "Your OTP for resetting the SecureVault password is:\n\n" +
                otp +
                "\n\nThis OTP is valid for 5 minutes.\n\n" +
                "Do not share this OTP with anyone."
        );

        mailSender.send(message);
    }
}