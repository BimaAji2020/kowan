import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  // Setup Nodemailer Gmail (gunakan App Password Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Pesan Baru dari: ${name}`,
      html: `
        <b>Nama:</b> ${name}<br>
        <b>Email:</b> ${email}<br>
        <b>Pesan:</b><br>${message}
      `
    });

    return res.status(200).json({ message: "Pesan berhasil dikirim!" });

  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({ message: "Gagal mengirim pesan." });
  }
}
