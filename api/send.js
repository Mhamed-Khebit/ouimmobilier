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
      to: "ouimmobiliermarrakech@gmail.com", // your inbox
      subject: subject || "Contact Form Message",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #007BFF;">Nouveau message de contact depuis le site Ouimmobilier</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Nom :</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email :</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Téléphone :</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Sujet :</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Message :</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">
          Ce message a été envoyé depuis le contact du site Ouimmobilier.
        </p>
      </div>
    `
    

    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "E-mail envoyé avec succès !" });
  } catch (err) {
    console.error("SMTP Error:", err);
    return res.status(500).json({ error: "L’envoi de l’e-mail a échoué" });
  }
}
