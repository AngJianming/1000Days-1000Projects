// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for OTPs (In production, use a database)
const otpStore = {};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password', // Consider using environment variables
    },
});

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP associated with the email
    otpStore[email] = otp;

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'Failed to send OTP' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ message: 'OTP sent successfully' });
        }
    });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
        // OTP is correct
        delete otpStore[email]; // Remove OTP after verification
        res.send({ message: 'OTP verified successfully' });
    } else {
        // OTP is incorrect
        res.status(400).send({ message: 'Invalid OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
