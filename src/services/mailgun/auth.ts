import { sendMail } from ".";
import jwt from "jsonwebtoken";
import config from "../../config";
import { VerificationPayload } from "../../types";

export const sendVerificationMail = ({ email, id, name }: VerificationPayload) => {
    const token = jwt.sign({ email, id, name }, config.jwt.secret, { expiresIn: "15m" });

    console.log(`Sending verification mail to ${email}`);

    return sendMail({
        to: email,
        from: `Registration <noreply@petmed.com>`,
        subject: "Verify your PetMed Account",
        body: `Please click the below link to verify your account. This link will expire after 15 minutes.
          <a href="${config.domain.url}/verify?token=${token}&type=verification">Verify</a>
        `,
    });
};
