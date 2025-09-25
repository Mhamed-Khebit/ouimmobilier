import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // set in Vercel env
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
    });

    const mailOptions = {
      from: email,
      to: "mhamedkbt@gmail.com", // your inbox
      subject: subject || "Contact Form Message",
      html: `
        <h2>New Contact from Agadir Keys Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "✅ Email sent successfully!" });
  } catch (err) {
    console.error("SMTP Error:", err);
    return res.status(500).json({ error: "❌ Failed to send email" });
  }
}
