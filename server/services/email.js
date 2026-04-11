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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: Arial, sans-serif; background: #f0ece4; margin: 0; padding: 0; }
          .wrap { max-width: 600px; margin: 0 auto; background: #fff; }
          .banner img { width: 100%; display: block; }
          .body { padding: 36px 40px; }
          .body h2 { color: #1a4a2e; font-size: 22px; margin: 0 0 12px; }
          .body p { color: #444; line-height: 1.75; font-size: 15px; margin: 0 0 16px; }
          .btn-wrap { text-align: center; margin: 28px 0; }
          .btn { display: inline-block; background: #c9a84c; color: #fff !important; text-decoration: none; padding: 15px 36px; border-radius: 8px; font-weight: 700; font-size: 15px; }
          .divider { border: none; border-top: 1px solid #e8e4d9; margin: 28px 0; }
          .author { display: flex; align-items: center; gap: 16px; }
          .author img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
          .author-name { font-weight: 700; color: #1a4a2e; font-size: 15px; }
          .author-title { color: #c9a84c; font-size: 13px; }
          .author-tag { color: #888; font-size: 12px; font-style: italic; }
          .footer { background: #1a4a2e; padding: 20px 40px; text-align: center; color: #a8d5b5; font-size: 12px; }
          .footer a { color: #c9a84c; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <!-- Banner -->
          <div class="banner">
            <img src="https://guide.prateek.africa/assets/cover_email_banner.jpg" alt="Breaking Into Africa — Prateek Jain" />
          </div>

          <!-- Body -->
          <div class="body">
            <h2>Welcome, ${firstName}! 🌍</h2>
            <p>Thank you for downloading <strong>"Breaking Into Africa."</strong> Your free guide is ready — packed with practical, field-tested advice on registering companies, banking, payments, exporting, importing, and building a life on the continent.</p>

            <div class="btn-wrap">
              <a href="${pdfUrl}" class="btn">⬇️ Download Your PDF</a>
            </div>

            <p>You can also <a href="${process.env.CLIENT_URL || 'https://guide.prateek.africa'}" style="color:#1a4a2e;font-weight:600;">read the interactive version online</a> — with an Africa region map, chapter navigation, progress tracking, and more.</p>

            <p>This guide is the result of years of first-hand experience doing business across the continent — from registering companies in Kenya to navigating payments in Nigeria. I wrote it so you don't have to learn these lessons the expensive way.</p>

            <p>If you have questions, want to connect, or just want to talk Africa business — reply to this email. I read every message.</p>

            <hr class="divider" />

            <!-- Author sign-off -->
            <div class="author">
              <img src="https://guide.prateek.africa/assets/author_portrait_circle.png" alt="Prateek Jain" />
              <div>
                <div class="author-name">Prateek Jain</div>
                <div class="author-title">Co-Founder at Trackalways · Nairobi, Kenya</div>
                <div class="author-tag">"Building Businesses Across Borders"</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <a href="https://prateek.africa">prateek.africa</a> &nbsp;·&nbsp;
            <a href="https://trackalways.com">trackalways.com</a>
            <br/><br/>
            &copy; ${new Date().getFullYear()} Prateek Jain &nbsp;|&nbsp; You're receiving this because you requested the guide.
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

module.exports = { sendWelcomeEmail };
