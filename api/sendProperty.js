import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, propertyType, location, price, description } = req.body;

    // ✅ create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ format mail
    const mailOptions = {
      from: email || process.env.EMAIL_USER,
      to: "mhamedkbt@gmail.com",
      subject: "Nouvelle propriété soumise sur BOOKDARI",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #007BFF;">Nouvelle Propriété Reçue</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="font-weight:bold;padding:5px;">Nom:</td><td>${name || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Email:</td><td>${email || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Téléphone:</td><td>${phone || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Type de bien:</td><td>${propertyType || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Localisation:</td><td>${location || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Prix:</td><td>${price || "N/A"}</td></tr>
            <tr><td style="font-weight:bold;padding:5px;">Description:</td><td>${description || "N/A"}</td></tr>
          </table>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de dépôt de bien sur OUImmobilier.
          </p>
        </div>
      `,
    };

    // ✅ send mail
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email envoyé avec succès !" });

  } catch (error) {
    console.error("Erreur SMTP:", error);
    return res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
}
