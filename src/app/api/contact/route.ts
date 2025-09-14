import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { title, name, email, message } = await req.json();

  const myEmail = process.env.MY_EMAIL;

  if (!title || !name || !email || !message || !myEmail) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [myEmail],
      subject: `[Contact Form] ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom: 4px;">
            New Contact Form Submission
          </h2>
          <p><strong style="color: #555;">Name:</strong> ${name}</p>
          <p><strong style="color: #555;">Email:</strong> ${email}</p>
          <p><strong style="color: #555;">Message:</strong></p>
          <p style="background-color: #f4f4f4; padding: 10px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
