import nodemailer from 'nodemailer';

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Outlook",
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOTMAIL_USERNAME,
        pass: process.env.HOTMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.HOTMAIL_USERNAME, // Substitua por sua variável de ambiente
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  }
}

export default new EmailService();