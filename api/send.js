import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  console.log("New Contact Form Submission:", req.body);

  // Configure Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,  // set in Vercel Environment Variables
      pass: process.env.GMAIL_PASS,  // app password
    },
  });

  const mailOptions = {
    from: email,                     // sender is the visitor
    to: process.env.TO_EMAIL,        // your client's email
    subject: subject || "Contact Form Message",
    html: `
      <h3>New Contact from Agadir Keys Website</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("SMTP Error:", err);
    return res.status(500).json({ error: "Failed to send email: " + err.message });
  }
}
