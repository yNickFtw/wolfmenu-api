import { ISMTPService } from './ISMTPService'
import nodemailer from 'nodemailer';
require('dotenv').config();

export default class SMTPService implements ISMTPService {
    public async send(toEmail: string, subject: string, html: string): Promise<void> {
        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.MAIL_PASS
                }
            }
        );

        transporter.sendMail({
            from: "WolfMenu <wolfmenubr@gmail.com>",
            to: `${toEmail}`,
            subject: `${subject}`,
            html: `${html}`
        })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));

        return;
    }
}