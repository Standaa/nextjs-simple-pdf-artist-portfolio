"use server";

import { Resend } from "resend";

console.log("process.env.RESEND_API_KEY", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

  try {
    await resend.emails.send({
      from: "contact@iseultperrault.com",
      to: "perraultiseult@gmail.com",
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "An error occurred while sending the message" };
  }
}
