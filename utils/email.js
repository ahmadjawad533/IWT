const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendReceiptEmail = async (donation) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: donation.donorEmail,
        subject: `Donation Receipt - ${donation.receiptNumber}`,
        html: `
            <h2>Thank You for Your Donation!</h2>
            <p>Dear ${donation.donorName},</p>
            <p>Jazakallah Khair for your generous donation to Ismail Welfare Trust.</p>
            <h3>Donation Details:</h3>
            <ul>
                <li><strong>Receipt Number:</strong> ${donation.receiptNumber}</li>
                <li><strong>Amount:</strong> Rs. ${donation.amount.toLocaleString()}</li>
                <li><strong>Type:</strong> ${donation.donationType.toUpperCase()}</li>
                <li><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleDateString()}</li>
                ${donation.caseId ? `<li><strong>Case ID:</strong> ${donation.caseId}</li>` : ''}
            </ul>
            <p>Your donation will be used to help those in need. May Allah accept your charity.</p>
            <p>Best regards,<br>Ismail Welfare Trust</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

const sendContactEmail = async ({ name, email, phone, message }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendReceiptEmail, sendContactEmail };
