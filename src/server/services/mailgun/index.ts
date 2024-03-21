import mailgun from "mailgun.js";
import FormData from "form-data";
import config from "../../config";

const client = new mailgun(FormData).client({
    username: "api",
    key: config.mailgun.api_key,
});

interface MailProps {
    to: string;
    from: string;
    subject: string;
    body: string;
}

export const sendMail = ({ to, from, subject, body }: MailProps) => {
    return client.messages.create(config.mailgun.domain, {
        to,
        from,
        subject,
        html: body,
    });
};
