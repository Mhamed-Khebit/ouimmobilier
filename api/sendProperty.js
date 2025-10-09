import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, propertyType, transaction, location, surface, price, description } = req.body;

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
      subject: `Nouveau formulaire de ${transaction || "propriété"} - ${propertyType || "Bien"}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #007BFF;">Nouvelle Propriété Soumise from Ouimmobilier Marrakech Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Nom:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Téléphone:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Type de bien:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${propertyType}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Transaction:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${transaction}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Localisation:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${location}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Surface:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${surface} m²</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Prix:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${price} MAD</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Description:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${description}</td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de dépôt de bien sur <strong>Ouimmobilier Marrakech</strong> Website.
          </p>
        </div>
      `
    };
    

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Formulaire envoyé avec succès !" });
  } catch (err) {
    console.error("SMTP Error:", err);
    return res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
  }
}
