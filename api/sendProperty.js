import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    propertyType,
    transactionType,
    price,
    location,
    description,
    images,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    const mailOptions = {
      from: email,
      to: "mhamedkbt@gmail.com",
      subject: `🟦 Nouvelle soumission de bien — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #00ADE7;">Nouveau bien soumis sur BOOKDARI</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Nom:</td><td style="padding: 5px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email:</td><td style="padding: 5px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Téléphone:</td><td style="padding: 5px; border: 1px solid #ddd;">${phone}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Type de bien:</td><td style="padding: 5px; border: 1px solid #ddd;">${propertyType}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Transaction:</td><td style="padding: 5px; border: 1px solid #ddd;">${transactionType}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Prix:</td><td style="padding: 5px; border: 1px solid #ddd;">${price}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Localisation:</td><td style="padding: 5px; border: 1px solid #ddd;">${location}</td></tr>
            <tr><td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Description:</td><td style="padding: 5px; border: 1px solid #ddd;">${description}</td></tr>
          </table>

          ${
            images && images.length > 0
              ? `
            <h3 style="color:#112E4C; margin-top:20px;">📸 Photos du bien</h3>
            ${images
              .slice(0, 3)
              .map(
                (img) =>
                  `<img src="${img}" alt="Property Image" style="max-width:200px; margin:5px; border-radius:8px;">`
              )
              .join("")}
          `
              : ""
          }

          <p style="font-size:12px; color:#777; margin-top:20px;">
            Ce message a été envoyé automatiquement depuis le site BOOKDARI.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (err) {
    console.error("Erreur SMTP:", err);
    return res.status(500).json({ error: "Échec de l’envoi de l’email" });
  }
}
