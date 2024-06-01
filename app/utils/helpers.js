const dotenv = require('dotenv');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

dotenv.config();

class Helpers {
    generateOTP(){
        return otpGenerator.generate(4,{
            digits: true,
            alphabets: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            uppercase: false,
            specialChars: false
        })
    }

    async sendEmail(email, subject, message) {
        // Send OTP email
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
    
        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: email,
          subject: subject,
          text: `${message}`,
        };
    
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent successfully:', info.response);
          return { success: true, message: 'OTP sent successfully' };
        } catch (error) {
          console.error('Error sending email:', error);
          return { success: false, error: 'Failed to send OTP email' };
        }
      }
}

module.exports = Helpers;