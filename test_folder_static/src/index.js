const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now())
//   }
// }

app.use(express.static(path.join(__dirname, 'public')))

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'bryanbarca20@gmail.com',
    pass: 'myaphqpivmwudtnq'
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "./public/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "./public/views"),
  extName: ".handlebars",
};

transporter.use(
  "compile",
  hbs(handlebarOptions)
);

var mailOptions = {
  from: "bryanbarca20@gmail.com",
  to: "ing.bryanblanco10@gmail.com",
  subject: "Restaurar contraseña de Guiia",
  template: "email",
  context: {
    link: 'https://facebook.com',
  },
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

app.get("/", (req, res) => {
  res.send("Hello word");
})

app.listen(port, () => {
  console.log(`Serve listening on port ${port}`);
})