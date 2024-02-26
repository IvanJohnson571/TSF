const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
var url = require('url');
//const userGMail = 'ivanjohnson58@gmail.com';
const myMail = 'ivan_johnson2005@yahoo.com';
//const pass = 'cgju jqyq zlbe pluc'; //NOTE: google account - old
//const pass = 'rgyu miew meab jfni'; //NOTE: google account.
//const pass = 'zzmwvotllrzqlbnq'; //NOTE: yahoo account. //https://tsf-bg.com
const pass = 'kqujzpqvhxiwddpr'; //NOTE: yahoo account. //test
mailTrapAccessEmail = "info@tsf-bg.com";

var endOfTextData = '';

function sendEmail(query) {

  endOfTextData = " от: " + query.name + ', тел: ' + query.phone + ', поща: ' + query.email;

  return new Promise((resolve, reject) => {

    var transporter = nodemailer.createTransport({

      //mailtrap!!!

      host: 'live.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: 'api',
        pass: 'e978725bbbb6c5837599ea831e30233e'
      },
      //tlsOptions: { rejectUnauthorized: false }

      //LocalHost!!!

      //host: 'smtp.mail.yahoo.com',
      //port: 465,
      //service: 'yahoo',
      //secure: true,
      //auth: {
      //  user: myMail,
      //  pass: pass
      //},
      //tls: { rejectUnauthorized: false },

    });


    //    let HTML = `<html lang="en">
    //  <head>
    //    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    //    <title>Simple Transactional Email</title>
    //    <style media="all" type="text/css">

    //    body {
    //      font-family: Helvetica, sans-serif;
    //      -webkit-font-smoothing: antialiased;
    //      font-size: 16px;
    //      line-height: 1.3;
    //      -ms-text-size-adjust: 100%;
    //      -webkit-text-size-adjust: 100%;
    //    }

    //    table {
    //      border-collapse: separate;
    //      mso-table-lspace: 0pt;
    //      mso-table-rspace: 0pt;
    //      width: 100%;
    //    }

    //    table td {
    //      font-family: Helvetica, sans-serif;
    //      font-size: 16px;
    //      vertical-align: top;
    //    }

    //    body {
    //      background-color: #f4f5f6;
    //      margin: 0;
    //      padding: 0;
    //    }

    //    .body {
    //      background-color: #f4f5f6;
    //      width: 100%;
    //    }

    //    .container {
    //      margin: 0 auto !important;
    //      max-width: 600px;
    //      padding: 0;
    //      padding-top: 24px;
    //      width: 600px;
    //    }

    //    .content {
    //      box-sizing: border-box;
    //      display: block;
    //      margin: 0 auto;
    //      max-width: 600px;
    //      padding: 0;
    //    }

    //    .main {
    //      background: #ffffff;
    //      border: 1px solid #eaebed;
    //      border-radius: 16px;
    //      width: 100%;
    //    }

    //    .wrapper {
    //      box-sizing: border-box;
    //      padding: 24px;
    //    }

    //    .footer {
    //      clear: both;
    //      padding-top: 24px;
    //      text-align: center;
    //      width: 100%;
    //    }

    //    .footer td,
    //    .footer p,
    //    .footer span,
    //    .footer a {
    //      color: #9a9ea6;
    //      font-size: 16px;
    //      text-align: center;
    //    }

    //    p {
    //      font-family: Helvetica, sans-serif;
    //      font-size: 16px;
    //      font-weight: normal;
    //      margin: 0;
    //      margin-bottom: 16px;
    //    }

    //    a {
    //      color: #0867ec;
    //      text-decoration: underline;
    //    }
    //    /* -------------------------------------
    //    BUTTONS
    //------------------------------------- */

    //    .btn {
    //      box-sizing: border-box;
    //      min-width: 100% !important;
    //      width: 100%;
    //    }

    //    .btn > tbody > tr > td {
    //      padding-bottom: 16px;
    //    }

    //    .btn table {
    //      width: auto;
    //    }

    //    .btn table td {
    //      background-color: #ffffff;
    //      border-radius: 4px;
    //      text-align: center;
    //    }

    //    .btn a {
    //      background-color: #ffffff;
    //      border: solid 2px #0867ec;
    //      border-radius: 4px;
    //      box-sizing: border-box;
    //      color: #0867ec;
    //      cursor: pointer;
    //      display: inline-block;
    //      font-size: 16px;
    //      font-weight: bold;
    //      margin: 0;
    //      padding: 12px 24px;
    //      text-decoration: none;
    //      text-transform: capitalize;
    //    }

    //    .btn-primary table td {
    //      background-color: #0867ec;
    //    }

    //    .btn-primary a {
    //      background-color: #0867ec;
    //      border-color: #0867ec;
    //      color: #ffffff;
    //    }

    //    @media all {
    //      .btn-primary table td:hover {
    //        background-color: #ec0867 !important;
    //      }
    //      .btn-primary a:hover {
    //        background-color: #ec0867 !important;
    //        border-color: #ec0867 !important;
    //      }
    //    }

    //    /* -------------------------------------
    //    OTHER STYLES THAT MIGHT BE USEFUL
    //------------------------------------- */

    //    .last {
    //      margin-bottom: 0;
    //    }

    //    .first {
    //      margin-top: 0;
    //    }

    //    .align-center {
    //      text-align: center;
    //    }

    //    .align-right {
    //      text-align: right;
    //    }

    //    .align-left {
    //      text-align: left;
    //    }

    //    .text-link {
    //      color: #0867ec !important;
    //      text-decoration: underline !important;
    //    }

    //    .clear {
    //      clear: both;
    //    }

    //    .mt0 {
    //      margin-top: 0;
    //    }

    //    .mb0 {
    //      margin-bottom: 0;
    //    }

    //    .preheader {
    //      color: transparent;
    //      display: none;
    //      height: 0;
    //      max-height: 0;
    //      max-width: 0;
    //      opacity: 0;
    //      overflow: hidden;
    //      mso-hide: all;
    //      visibility: hidden;
    //      width: 0;
    //    }

    //    .powered-by a {
    //      text-decoration: none;
    //    }

    //    /* -------------------------------------
    //    RESPONSIVE AND MOBILE FRIENDLY STYLES
    //------------------------------------- */

    //    @media only screen and (max-width: 640px) {
    //      .main p,
    //      .main td,
    //      .main span {
    //        font-size: 16px !important;
    //      }
    //      .wrapper {
    //        padding: 8px !important;
    //      }
    //      .content {
    //        padding: 0 !important;
    //      }
    //      .container {
    //        padding: 0 !important;
    //        padding-top: 8px !important;
    //        width: 100% !important;
    //      }
    //      .main {
    //        border-left-width: 0 !important;
    //        border-radius: 0 !important;
    //        border-right-width: 0 !important;
    //      }
    //      .btn table {
    //        max-width: 100% !important;
    //        width: 100% !important;
    //      }
    //      .btn a {
    //        font-size: 16px !important;
    //        max-width: 100% !important;
    //        width: 100% !important;
    //      }
    //    }
    //    /* -------------------------------------
    //    PRESERVE THESE STYLES IN THE HEAD
    //------------------------------------- */

    //    @media all {
    //      .ExternalClass {
    //        width: 100%;
    //      }
    //      .ExternalClass,
    //      .ExternalClass p,
    //      .ExternalClass span,
    //      .ExternalClass font,
    //      .ExternalClass td,
    //      .ExternalClass div {
    //        line-height: 100%;
    //      }
    //      .apple-link a {
    //        color: inherit !important;
    //        font-family: inherit !important;
    //        font-size: inherit !important;
    //        font-weight: inherit !important;
    //        line-height: inherit !important;
    //        text-decoration: none !important;
    //      }
    //      #MessageViewBody a {
    //        color: inherit;
    //        text-decoration: none;
    //        font-size: inherit;
    //        font-family: inherit;
    //        font-weight: inherit;
    //        line-height: inherit;
    //      }
    //    }
    //    </style>
    //  </head>
    //  <body>
    //    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    //      <tr>
    //        <td>&nbsp;</td>
    //        <td class="container">
    //          <div class="content">
    //            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
    //              <!-- START MAIN CONTENT AREA -->
    //              <tr>
    //                <td class="wrapper">
    //                  <p>Oт: ` + query.name`</p>
    //                  <p>Тема: ` + query.subject`</p>
    //                  <p>Email: ` + query.email`</p>
    //                  <p>Phone: ` + query.phone`</p>
    //                  <p>` +
    //      query.message`</p>
    //                </td>
    //              </tr>

    //              <!-- END MAIN CONTENT AREA -->
    //              </table>

    //            <!-- START FOOTER -->
    //            <div class="footer">
    //              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    //                <tr>
    //                  <td class="content-block">
    //					<img scr="https://tsf-bg.com/images/icons/logo.png" />
    //                  </td>
    //                </tr>
    //              </table>
    //            </div>

    //            <!-- END FOOTER -->

    //<!-- END CENTERED WHITE CONTAINER --></div>
    //        </td>
    //        <td>&nbsp;</td>
    //      </tr>
    //    </table>
    //  </body>
    //</html>`;

    var mailOptions = {
      from: mailTrapAccessEmail, //query.email,
      to: myMail,
      subject: query.subject,
      text: query.message + endOfTextData,
      generateTextFromHTML: true,
      html: ""
    };

    transporter.sendMail(mailOptions, function (error, info) {

      if (error) {
        return reject({ message: 'An error has occured!' });
        //return reject({ message: error });

      }

      return resolve({ message: "Email sent successfully!" });

    });

  });

}

router.get("", (req, res, next) => {

  sendEmail(req.query)
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response.message
      });
    })
    .catch((error) => {
      res.status(500).send(error/*error.message*/);
    });

});

module.exports = router;

function generateHTML(query) {



  //return testHTML;

}
