const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const credentials = require('./config.js');
const app = express();
const port = process.env.PORT || 9000;
const user = process.env.EMAIL_USER || credentials.USER;
const pass = process.env.EMAIL_PASS || credentials.PASS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port '+port);
});

app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/send', (req,res) => {
  console.log('Enviando email');
  var data = req.body;
  console.log(data);
  var smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: user,
        pass: pass
      }
  });

  var mailOptions = {
      from: data.email,
      to: 'lauratristan@gmail.com',
      subject: 'MENSAJE EN elsacajiao.com',
      html: `<p>${data.name}</p>
            <p>${data.email}</p>
            <p>${data.message}</p>`
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if(error) {
      res.send(error)
    } else {
      res.send('Success')
    }
    smtpTransport.close();
  });

})
