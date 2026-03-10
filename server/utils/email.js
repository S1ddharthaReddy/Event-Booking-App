require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendOtpEmail = async (email, otp, type)=>{
    try {

        const title = type === 'account_verification' ? 'Verify your account' : 'Event Booking Verification';
        const message = type === 'account_verification'
        ? 'Please use the following OTP to verify your new Account'
        : 'Please use the following OTP to verify and confirm your event booking.'


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align:center; padding: 20px;">
                    <h2 style="color: #111;"> ${title} </h2>
                    <p style="color: #555; font-size: 16px;"> ${message} </p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; ">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px;"> This code expires in 5 minutes </p>
                </div>
            `
        };
    
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email} for ${type}`);
    }
    catch(error){
        console.error(`Error sending OTP email to ${email} for ${type}`, error)
    }
};

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
                <h2> Hi ${userName}! </h2>
                <p> Your booking for the event <strong> ${eventTitle} </strong> is successfully confirmed </p>
                <p> Thank you for choosing us </p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", userEmail);
    }
    catch(error){
        console.log("Error sending email: ", error);
    }
};

module.exports = {sendOtpEmail, sendBookingEmail};