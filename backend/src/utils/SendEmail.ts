import nodemailer from 'nodemailer';

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Outlook", // Ou "Hotmail"
      host: "smtp.office365.com",
      port: 587,
      secure: false, // Defina como false para usar TLS
      auth: {
        user: process.env.HOTMAIL_USERNAME, // Substitua por sua variável de ambiente
        pass: process.env.HOTMAIL_PASSWORD, // Substitua por sua variável de ambiente
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