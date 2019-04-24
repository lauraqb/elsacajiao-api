const API_BASE = "/api"
var express = require("express");
const nodemailer = require('nodemailer');
const credentials = require('../config');
var router = express.Router();
const user = process.env.EMAIL_USER || credentials.USER;
const pass = process.env.EMAIL_PASS || credentials.PASS;

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get(`${API_BASE}/articles`, (req, res)=>{
    //const query = db.getArticles();     
});

router.post(`${API_BASE}/send`, (req,res) => {
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
        subject: data.subject,
        html: `<p>${data.name}</p>
              <p>${data.email}</p>
              <p>${data.message}</p>`
    };
  
    smtpTransport.sendMail(mailOptions, (error, response) => {
      console.log("smtpTransport");
      if(error) {
        res.send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close();
    });
  
})
module.exports = router;
