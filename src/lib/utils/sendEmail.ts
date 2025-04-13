import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import { Resend } from "resend";
export async function sendEmail(
  email: string,
  code: string,
  user_name: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const subject = "Seu código de verificação";
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [email],
    subject,
    react: VerifyEmailTemplate({
      verificationCode: code,
      recipientName: user_name,
    }),
  });

  if (error) {
    throw new Error("Error sending email: " + error.message);
  }

  return data;
}
