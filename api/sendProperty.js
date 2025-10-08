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
      to: "mhamedkbt@gmail.com",
      subject: `Nouveau formulaire de ${transaction || "propriété"} - ${propertyType || "Bien"}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; background: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 15px; padding: 30px; box-shadow: 0 0 15px rgba(0,0,0,0.1);">
            <h1 style="color: #112E4C; text-align: center; margin-bottom: 20px;">Nouvelle propriété soumise</h1>
    
            <p style="color: #555; font-size: 16px;">Bonjour,</p>
            <p style="color: #555; font-size: 16px;">
              Vous avez reçu une nouvelle soumission de propriété via le formulaire <strong>Ouimmobilier Marrakech</strong>. Voici les détails :
            </p>
    
            <div style="margin: 20px 0;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone}</p>
              <p><strong>Type de bien:</strong> ${propertyType}</p>
              <p><strong>Transaction:</strong> ${transaction}</p>
              <p><strong>Localisation:</strong> ${location}</p>
              <p><strong>Surface:</strong> ${surface} m²</p>
              <p><strong>Prix:</strong> ${price} MAD</p>
              <p><strong>Description:</strong><br> ${description}</p>
            </div>
    
            <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">
              Ce message a été envoyé depuis le formulaire de dépôt de bien sur <strong>Ouimmobilier Marrakech</strong>.
            </p>
          </div>
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
