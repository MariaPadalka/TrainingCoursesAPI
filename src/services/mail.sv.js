import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3',
            },
        });
    }

    async sendPasswordMail(to, password) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Your Account Credentials',
            html: `
                <div>
                    <h1>Welcome to Our Application</h1>
                    <p>Your account has been created. Below are your credentials:</p>
                    <p><strong>Email:</strong> ${to}</p>
                    <p><strong>Password:</strong> ${password}</p>
                    <p>Please, change your password after the first login.</p>
                </div>
            `,
        });
    }
}

export default new MailService();
