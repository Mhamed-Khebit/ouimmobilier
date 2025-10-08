import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, attachments } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.email,
      to: "mhamedkbt@gmail.com",
      subject: `Nouvelle soumission de bien (${data.transaction})`,
      html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6;">
        <h2 style="color:#112E4C;">Nouvelle soumission de bien via le formulaire Ouimmobilier</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Nom:</td><td style="padding:5px; border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Email:</td><td style="padding:5px; border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Téléphone:</td><td style="padding:5px; border:1px solid #ddd;">${data.phone}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Type de bien:</td><td style="padding:5px; border:1px solid #ddd;">${data.propertyType}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Transaction:</td><td style="padding:5px; border:1px solid #ddd;">${data.transaction}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Localisation:</td><td style="padding:5px; border:1px solid #ddd;">${data.location}</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Surface:</td><td style="padding:5px; border:1px solid #ddd;">${data.surface} m²</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Prix:</td><td style="padding:5px; border:1px solid #ddd;">${data.price} MAD</td></tr>
          <tr><td style="font-weight:bold; padding:5px; border:1px solid #ddd;">Description:</td><td style="padding:5px; border:1px solid #ddd;">${data.description}</td></tr>
        </table>
        <p style="font-size:12px; color:#777; margin-top:20px;">Ce message a été envoyé depuis le formulaire Ouimmobilier.</p>
      </div>
      `,
      attachments: attachments.map(file => ({
        filename: file.filename,
        content: Buffer.from(file.content.data),
      })),
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (err) {
    console.error("SMTP Error:", err);
    res.status(500).json({ error: "Impossible d'envoyer l'email" });
  }
}
