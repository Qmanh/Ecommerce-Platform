package com.dev.ecommerce.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender javaMailSender;

    private final ThymeleafService thymeleafService;

    @Value("${spring.mail.username}")
    private String email;

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text){

        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                    mimeMessage, "utf-8"
            );
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(text);
            mimeMessageHelper.setTo(userEmail);
            javaMailSender.send(mimeMessage);
        }catch(MailException | MessagingException e){
            throw new MailSendException("failed to send email");
        }
    }

    public void VerificationOtpEmail(String otp, String userEmail){

        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                    mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );
            mimeMessageHelper.setSubject("Test Email");
            mimeMessageHelper.setTo(userEmail);

            String link = "http://localhost:3000/verify/"+otp;
            Map<String, Object> variables = new HashMap<>();
            variables.put("otp",otp);
            variables.put("link",link);

            SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy");
            variables.put("date",date.format(new Date()));

            mimeMessageHelper.setText(thymeleafService.createContent("mail-sender.html",variables),true);
            mimeMessageHelper.setFrom(email);

            javaMailSender.send(mimeMessage);
        }catch(MailException | MessagingException e){
            throw new MailSendException("failed to send email");
        }
    }
}
