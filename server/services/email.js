const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(firstName, email) {
  const pdfUrl = process.env.PDF_URL || 'https://guide.prateek.africa/api/pdf/download';

  await resend.emails.send({
    from: 'Prateek Jain <hello@prateek.africa>',
    to: email,
    subject: 'Your Free Copy: Breaking Into Africa',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background: #faf8f3; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
          .header { background: #1a4a2e; padding: 40px 40px 32px; text-align: center; }
          .header h1 { color: #c9a84c; font-size: 22px; margin: 0 0 8px; letter-spacing: 0.5px; }
          .header p { color: #d4edda; font-size: 14px; margin: 0; }
          .body { padding: 40px; }
          .body h2 { color: #1a4a2e; font-size: 20px; margin-top: 0; }
          .body p { color: #444; line-height: 1.7; font-size: 15px; }
          .btn { display: inline-block; background: #c9a84c; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 16px 0; }
          .footer { background: #f5f3ee; padding: 24px 40px; text-align: center; color: #888; font-size: 13px; border-top: 1px solid #e8e4d9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Breaking Into Africa</h1>
            <p>The Complete Guide to Living, Working & Building Business Across the Continent</p>
          </div>
          <div class="body">
            <h2>Welcome, ${firstName}!</h2>
            <p>Thank you for signing up. Your free copy of <strong>"Breaking Into Africa"</strong> is ready.</p>
            <p>This guide is the result of years of first-hand experience doing business across the continent — from registering companies in Kenya to navigating payments in Nigeria. I hope it gives you a real, practical edge.</p>
            <p style="text-align:center;">
              <a href="${pdfUrl}" class="btn">Download Your PDF</a>
            </p>
            <p>You can also <a href="${process.env.CLIENT_URL || 'https://guide.prateek.africa'}" style="color:#1a4a2e;">read the interactive version online</a> with maps, chapter navigation, and more.</p>
            <p>If you have questions or want to connect, just reply to this email.</p>
            <p>To your success in Africa,<br/><strong>Prateek Jain</strong><br/><em>Co-Founder at Trackalways</em><br/><em>"Building Businesses Across Borders"</em></p>
          </div>
          <div class="footer">
            prateek.africa &nbsp;|&nbsp; &copy; ${new Date().getFullYear()} Prateek Jain
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

module.exports = { sendWelcomeEmail };
