export interface ISMTPService {
    send(toEmail: string, subject: string, html: string,): Promise<void>;
}