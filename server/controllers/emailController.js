import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';
export const sendEmail = async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      try {
        // Set up transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        // Email content
        const mailOptions = {
          from: email,
          to: process.env.RECEIVER_EMAIL,
          subject: `New Message from ${name}`,
          text: `
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
          `,
        };
    
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
      }
}