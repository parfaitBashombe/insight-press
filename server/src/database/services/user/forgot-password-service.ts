import crypto from "crypto";
import BaseService from "@/database/system/base-service.js";

type ForgotPasswordPayload = { email: string };
type ForgotPasswordResult = { success: true } | { error: string };

const EMAIL_TEMPLATE = (resetUrl: string, name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password – Insight Press</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #0C0C0C; font-family: 'DM Sans', Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased; }
  </style>
</head>
<body style="background-color:#0C0C0C; margin:0; padding:0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0C0C0C; min-height:100vh;">
    <tr>
      <td align="center" style="padding: 48px 16px;">
        <table role="presentation" width="100%" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="display:inline-table;">
                <tr>
                  <td style="background-color:#F59E0B; border-radius:10px; width:34px; height:34px; text-align:center; vertical-align:middle;">
                    <span style="color:#0C0C0C; font-size:16px; font-weight:700; line-height:34px;">✍</span>
                  </td>
                  <td style="padding-left:10px; vertical-align:middle;">
                    <span style="font-family:'Playfair Display', Georgia, serif; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:-0.3px;">Insight Press</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#161616; border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:48px 40px;">

              <!-- Icon -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align:center; padding-bottom:28px;">
                    <div style="display:inline-block; background-color:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); border-radius:50%; width:64px; height:64px; line-height:64px; text-align:center;">
                      <span style="font-size:28px;">🔑</span>
                    </div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td style="text-align:center; padding-bottom:12px;">
                    <h1 style="font-family:'Playfair Display', Georgia, serif; font-size:28px; font-weight:700; color:#ffffff; letter-spacing:-0.5px; line-height:1.2;">Reset your password</h1>
                  </td>
                </tr>

                <!-- Subtext -->
                <tr>
                  <td style="text-align:center; padding-bottom:36px;">
                    <p style="font-size:15px; color:rgba(255,255,255,0.45); line-height:1.7; max-width:380px; margin:0 auto;">
                      Hi <strong style="color:rgba(255,255,255,0.75);">${name}</strong>, we received a request to reset the password for your Insight Press account. This link expires in <strong style="color:#F59E0B;">15 minutes</strong>.
                    </p>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td style="text-align:center; padding-bottom:36px;">
                    <a href="${resetUrl}" style="display:inline-block; background-color:#F59E0B; color:#0C0C0C; font-family:'DM Sans', Arial, sans-serif; font-size:15px; font-weight:700; text-decoration:none; padding:16px 40px; border-radius:999px; letter-spacing:0.2px;">
                      Reset Password →
                    </a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <div style="height:1px; background-color:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>

                <!-- Fallback URL -->
                <tr>
                  <td style="text-align:center; padding-bottom:8px;">
                    <p style="font-size:12px; color:rgba(255,255,255,0.25); line-height:1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center; padding-bottom:28px;">
                    <p style="font-size:11px; color:#F59E0B; word-break:break-all; line-height:1.6;">${resetUrl}</p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <div style="height:1px; background-color:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>

                <!-- Warning -->
                <tr>
                  <td>
                    <p style="font-size:12px; color:rgba(255,255,255,0.25); text-align:center; line-height:1.7;">
                      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center; padding-top:32px;">
              <p style="font-size:12px; color:rgba(255,255,255,0.18); line-height:1.7;">
                © ${new Date().getFullYear()} Insight Press · All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

class ForgotPasswordService extends BaseService<
  ForgotPasswordPayload,
  ForgotPasswordResult
> {
  protected async transaction(
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResult> {
    const { email } = payload;

    const user = await this.database.user.findUnique({ where: { email } });

    // Always respond with success to prevent email enumeration
    if (!user) {
      return { success: true };
    }

    // Delete any previous reset tokens for this user
    await this.database.password_reset_token.deleteMany({
      where: { user_id: user.user_id },
    });

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await this.database.password_reset_token.create({
      data: {
        token,
        user_id: user.user_id,
        expiresAt,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { error: "Email service not configured" };
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Insight Press <onboarding@resend.dev>",
        to: [email],
        subject: "Reset your Insight Press password",
        html: EMAIL_TEMPLATE(resetUrl, user.fullname),
      }),
    });

    return { success: true };
  }
}

export default ForgotPasswordService;
