import nodemailer from "nodemailer";
import { Emailtemplate } from "./EmailTemplet.js";



export async function sendEmail (to,subject,username='',token){
    const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.PASSWORDSENDER,
        },
      });
      const info = await transporter.sendMail({
        from: `ecommerce website ^^" <${process.env.EMAILSENDER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        
        html:Emailtemplate(to,username,token)
      });
}