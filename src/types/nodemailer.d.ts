declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
  }

  export interface MailOptions {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
      filename?: string;
      content?: any;
      path?: string;
      contentType?: string;
    }>;
  }

  export interface SendMailResult {
    messageId: string;
    envelope: {
      from: string;
      to: string[];
    };
    accepted: string[];
    rejected: string[];
    pending: string[];
    response: string;
  }

  export interface Transporter {
    sendMail(mailOptions: MailOptions): Promise<SendMailResult>;
  }

  export function createTransport(options: TransportOptions): Transporter;
} 