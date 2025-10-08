import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ multiples: true, maxFileSize: 5 * 1024 * 1024 }); // 5MB limit

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const {
      name,
      email,
      phone,
      propertyType,
      transaction,
      location,
      surface,
      price,
      description,
    } = fields;

    // 🧩 Convert fields (because Formidable gives arrays)
    const clean = (val) => (Array.isArray(val) ? val[0] : val || "");

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const attachments = [];
      for (const key in files) {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        if (file && fs.existsSync(file.filepath)) {
          attachments.push({
            filename: file.originalFilename,
            path: file.filepath,
          });
        }
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "mhamedkbt@gmail.com",
        subject: `📄 Formulaire Vente/Location - ${clean(propertyType)}`,
        html: `
          <h2>Nouveau formulaire reçu</h2>
          <p><strong>Nom :</strong> ${clean(name)}</p>
          <p><strong>Email :</strong> ${clean(email)}</p>
          <p><strong>Téléphone :</strong> ${clean(phone)}</p>
          <p><strong>Type de bien :</strong> ${clean(propertyType)}</p>
          <p><strong>Transaction :</strong> ${clean(transaction)}</p>
          <p><strong>Localisation :</strong> ${clean(location)}</p>
          <p><strong>Surface :</strong> ${clean(surface)} m²</p>
          <p><strong>Prix :</strong> ${clean(price)} MAD</p>
          <p><strong>Description :</strong><br>${clean(description)}</p>
        `,
        attachments,
      };

      // ✅ wrap sendMail in Promise (Vercel needs this)
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) return reject(error);
          resolve(info);
        });
      });

      return res.status(200).json({ message: "Formulaire envoyé avec succès !" });
    } catch (error) {
      console.error("SMTP Error:", error);
      return res.status(500).json({ error: "Erreur lors de l'envoi du mail !" });
    }
  });
}
