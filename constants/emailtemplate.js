// function getEmailTemplate(yourotp, name) {

//     const emailTemplate = `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Your OTP Awaits!</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f7f7f7;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 20px auto;
//       background-color: #fff;
//       padding: 40px;
//       border-radius: 10px;
//       box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//     }
//     h1 {
//       color: #6c5ce7;
//       text-align: left;
//       position: relative;
//       padding-left: 120px; /* Adjust this value according to your image width */
//       margin-bottom: 40px; /* Add margin at the bottom to prevent text from moving up */
//     }
//     h1 img {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 130px;
//       height: auto;
//     }
//     p {
//       color: #333;
//       font-size: 16px;
//       line-height: 1;
//       margin-bottom: 20px;
//     }

//  .otp {
//   text-align: center;
//   margin-top: 30px;
//   padding: 10px;
//   background-color: #f3ab1a;
//   color: #fff;
//   border-radius: 5px;
//   font-size: 28px;
//   letter-spacing: 5px;
//   width: 260px;
//   margin: 0 auto;
// }

//     .btn-container {
//       text-align: center;
//       margin-top: 40px;
//     }
//     .cta-btn {
//       display: inline-block;
//       text-decoration: none;
//       background-color: #6c5ce7;
//       color: #fff;
//       padding: 15px 30px;
//       border-radius: 5px;
//       font-weight: bold;
//       transition: background-color 0.3s ease;
//     }
//     .cta-btn:hover {
//       background-color: #4a3cb1;
//     }
//   </style>
// </head>
// <body>   
//   <div class="container">
//     <h1><img src="https://res.cloudinary.com/drblnnnus/image/upload/v1714564815/1714564810794_image.png" alt=""></h1> <br>
//     <p>Dear [${name}],</p>
//     <p>Here is your one-time password (OTP) for password reset. Please note that it will expire in 2 minutes. </p>
//     <div class="otp">${yourotp}</div>

//     <p>Thank You,</p>
//     <p>[STREAMS SOLUTIONS]</p>
//   </div>
// </body>
// </html>`;
//     return emailTemplate;
// }
// module.exports = {
//     getEmailTemplate
// };
function getEmailTemplate(yourotp, name) {
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Awaits!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #6c5ce7;
          text-align: left;
          position: relative;
          padding-left: 120px; /* Adjust this value according to your image width */
          margin-bottom: 40px; /* Add margin at the bottom to prevent text from moving up */
        }
        h1 img {
          position: absolute;
          top: 0;
          left: 0;
          width: 130px;
          height: auto;
        }
        p {
          color: #333;
          font-size: 16px;
          line-height: 1;
          margin-bottom: 20px;
        }
        .otp {
          text-align: center;
          margin-top: 30px;
          padding: 10px;
          background-color: #f3ab1a;
          color: #fff;
          border-radius: 5px;
          font-size: 28px;
          letter-spacing: 5px;
          width: 260px;
          margin: 0 auto;
        }
        .btn-container {
          text-align: center;
          margin-top: 40px;
        }
        .cta-btn {
          display: inline-block;
          text-decoration: none;
          background-color: #6c5ce7;
          color: #fff;
          padding: 15px 30px;
          border-radius: 5px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .cta-btn:hover {
          background-color: #4a3cb1;
        }
      </style>
    </head>
    <body>   
      <div class="container">
        <h1><img src="https://res.cloudinary.com/drblnnnus/image/upload/v1714564815/1714564810794_image.png" alt=""></h1> <br>
        <p>Dear [${name}],</p>
        <p>Here is your one-time password (OTP) for password reset. Please note that it will expire in 2 minutes. </p>
        <div class="otp">${yourotp}</div>
        <p>Thank You,</p>
        <p>[STREAMS SOLUTIONS]</p>
      </div>
    </body>
    </html>`;
    return emailTemplate;
}

module.exports = {
    getEmailTemplate
};






