import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  try {
    await resend.emails.send({
      from: "Web Contact <onboarding@resend.dev>",
      to: process.env.MAIL_TO,
      subject: `Pesan baru dari ${name}`,
      html: `
        <h3>Pesan Baru Dari Form Website</h3>
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Pesan:</b><br>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Pesan berhasil dikirim!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Gagal mengirim pesan." });
  }
}
