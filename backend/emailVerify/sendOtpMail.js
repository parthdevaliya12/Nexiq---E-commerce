import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


export const sendOtpMail = async (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {

        // It should be a string of sender/server email
        from: process.env.MAIL_USER,

        to: email,

        // Subject of Email
        subject: 'Password reset OTP',
        html: `<p>OTP for password reset is:<b>${otp}</b></p><br><p>It is vaild only for 10 minutes</p>`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('OTP Sent Successfully');
        console.log(info);
    });
}




