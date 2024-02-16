import { Response } from "express-serve-static-core";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "jintuuu14@gmail.com",
    pass: "rkodpchkotisbfhf",
  },
});
interface MailResult {
  status: boolean;
  otp?: number;
}
const sendMail = (userMail: string): Promise<MailResult> => {
  return new Promise((resolve, reject) => {
    const otp = parseInt((Math.random() * 1000000).toString(), 10);

    const mailOptions = {
      from: "jintuuu14@gmail.com",
      to: userMail,
      subject: "Sending Email using Node.js",
      html: `<h3>OTP for account verification is </h3><h1 style='font-weight:bold;'>${otp}</h1>`,
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, (error: Error | null) => {
      if (error) {
        console.error("this is error  ", error, "PPPPP");
        resolve({ status: false });
      } else {
        resolve({ status: true, otp: otp });
      }
    });
  });
};

export { sendMail };
