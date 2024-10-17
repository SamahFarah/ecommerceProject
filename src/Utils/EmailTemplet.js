export const Emailtemplate = (email, username, token) => {
    return `<!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #e8eff1; /* خلفية باردة */
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
              background-color: #2C3E50; /* لون أزرق داكن فخم */
              color: white;
              padding: 15px;
              text-align: center;
              font-size: 26px;
          }
          .content {
              margin: 20px 0;
              text-align: center;
          }
          .content h1 {
              color: #34495E; /* لون نص بارد وفخم */
          }
          .content p {
              color: #7F8C8D; /* لون نص رمادي ناعم */
              font-size: 16px;
              line-height: 1.6;
          }
          a {
              display: inline-block;
              margin-top: 15px;
              padding: 10px 20px;
              background-color: #2980B9; /* زر بلون أزرق فخم */
              color: white;
              text-decoration: none;
              border-radius: 5px;
          }
          a:hover {
              background-color: #3498DB; /* تأثير عند التمرير */
          }
          .footer {
              text-align: center;
              padding: 10px;
              color: #95A5A6; /* لون رمادي فاتح */
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              Welcome to Our Service
          </div>
          <div class="content">
              <h1>Hello ${username}</h1>
              <p>We are excited to have you on board. Thank you for registering with us using the email: <strong>${email}</strong>.</p>
              <p>Please confirm your email address by clicking the link below:</p>
              <a href='https://ecommerceproject-i1bh.onrender.com/auth/confirmEmail/${token}'>Confirm Email</a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
          </div>
      </div>
  </body>
  </html>`
  }
  
  