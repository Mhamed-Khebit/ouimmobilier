import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ multiples: true, maxFileSize: 10 * 1024 * 1024 }); // 10MB max

  form.parse(req, async (err, fields, files) => {
    if(err) return res.status(500).json({ error: err.message });

    const { name, email, phone, propertyType, transaction, location, surface, price, description } = fields;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });

      const attachments = [];
      Object.keys(files).forEach(key => {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        attachments.push({ filename: file.originalFilename, path: file.filepath });
      });

      const mailOptions = {
        from: email,
        to: "mhamedkbt@gmail.com",
        subject: `Formulaire Vente/Location - ${propertyType}`,
        html: `
          <h2>Nouveau formulaire de vente/location</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Type de bien:</strong> ${propertyType}</p>
          <p><strong>Transaction:</strong> ${transaction}</p>
          <p><strong>Localisation:</strong> ${location}</p>
          <p><strong>Surface:</strong> ${surface} m²</p>
          <p><strong>Prix:</strong> ${price} MAD</p>
          <p><strong>Description:</strong><br>${description}</p>
        `,
        attachments
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Formulaire envoyé avec succès !" });
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de l'envoi du mail !" });
    }
  });
}
