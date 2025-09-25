// import express from "express";
// import nodemailer from "nodemailer";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // --- Configure Gmail SMTP ---
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mhameddev1@gmail.com",  // your Gmail
//     pass: "hnnapaeazxshbsbt"       // your app password
//   }
// });

// app.post("/send", (req, res) => {
//   const { name, email, phone, subject, message } = req.body;

//   console.log("New Contact Form Submission:", req.body);

//   const mailOptions = {
//     from: "mhameddev1@gmail.com",
//     to: "mhamedkbt@gmail.com",
//     subject: subject || "New Contact from Agadir Keys Website",
//     html: `
//     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//       <h2 style="color: #007BFF;">New Contact from Agadir Keys Website</h2>
//       <table style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Name:</td>
//           <td style="padding: 5px; border: 1px solid #ddd;">${name}</td>
//         </tr>
//         <tr>
//           <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email:</td>
//           <td style="padding: 5px; border: 1px solid #ddd;">${email}</td>
//         </tr>
//         <tr>
//           <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Phone:</td>
//           <td style="padding: 5px; border: 1px solid #ddd;">${phone}</td>
//         </tr>
//         <tr>
//           <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Subject:</td>
//           <td style="padding: 5px; border: 1px solid #ddd;">${subject}</td>
//         </tr>
//         <tr>
//           <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Message:</td>
//           <td style="padding: 5px; border: 1px solid #ddd;">${message}</td>
//         </tr>
//       </table>
//       <p style="font-size: 12px; color: #777; margin-top: 20px;">
//         This message was sent from the contact form on Agadir Keys Website.
//       </p>
//     </div>
//     `
//   };
  

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error("SMTP Error:", err);
//       res.status(500).send("Failed to send email: " + err.message);
//     } else {
//       console.log("Email sent:", info.response);
//       res.send("Email sent successfully!");
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
