package com.example.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Async
    public void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);
        mailSender.send(message);
    }

    @Async
    public void sendWelcomeEmail(String to, String name) throws MessagingException {
        String subject = "Welcome to Incident Hub!";
        String html = buildWelcomeEmail(name);
        sendEmail(to, subject, html);
    }

    private String buildWelcomeEmail(String name) {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Welcome to Incident Hub</title>
            </head>
            <body style="margin:0;padding:0;background-color:#111D28;font-family:'Segoe UI',Arial,sans-serif;">
              <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#111D28;padding:48px 16px;">
                <tr>
                  <td align="center">
                    <table width="100%%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#FAFAF7;border-radius:24px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.4);">
                      <tr>
                        <td style="background-color:#1C2B3A;padding:36px 40px 32px;text-align:center;">
                          <div style="display:inline-block;background:#C4714A;border-radius:14px;padding:10px 22px;">
                            <span style="font-size:22px;font-weight:700;color:#FAFAF7;letter-spacing:0.04em;">Incident Hub</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:44px 40px 36px;">

                          <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#C4714A;">
                            Account Created
                          </p>
                          <h1 style="margin:0 0 16px;font-size:30px;font-weight:400;color:#1C2B3A;line-height:1.2;">
                            Welcome aboard,<br/><strong style="font-weight:700;">%s</strong> 👋
                          </h1>
                          <p style="margin:0 0 28px;font-size:15px;color:#5A6E7F;line-height:1.7;">
                            Your IncidentHub account is ready. You can now view tickets, resolve them & send live comments.
                          </p>

                          <!-- CTA button -->
                          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                            <tr>
                              <td style="background-color:#1C2B3A;border-radius:12px;">
                                <a href="http://localhost:5173/"
                                   style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:600;color:#FAFAF7;text-decoration:none;letter-spacing:0.04em;">
                                  Go to Dashboard →
                                </a>
                              </td>
                            </tr>
                          </table>

         
                      <!-- Footer -->
                      <tr>
                        <td style="background-color:#F5F0E8;padding:24px 40px;text-align:center;border-top:1px solid #DDD8CE;">
                          <p style="margin:0 0 4px;font-size:11px;color:#8A9BAA;">
                            You're receiving this because you created a Incident Hub account.
                          </p>
                          <p style="margin:0;font-size:11px;color:#8A9BAA;">
                            © 2026 IncidentHub · All rights reserved
                          </p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """.formatted(name);
    }
}