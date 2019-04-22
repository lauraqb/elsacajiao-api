const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const credentials = require('./config.js');
const app = express();
const port = 9000;

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
        user: credentials.USER,
        pass: credentials.PASS
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
    }else {
      res.send('Success')
    }
    smtpTransport.close();
  });

})
