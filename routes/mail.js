
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.post('/', function(req, res){

    console.log(req.body);
    
    const body = "Question 1: \n" + (req.body.question1) + "\n \n" +
    "Question 2: \n" + req.body.question2 +  "\n \n" +
    "Question 3: \n" + req.body.question3; + "\n \n";    

    const email = req.body.email;

    sendMail("Survey",body, email);

    res.json({
        sent: "sent"
    })
});

function sendMail(subject, message, email){
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    const mailOpts = {
        from: 'Sender',
        to: email,
        subject: subject,
        text: message
    }
    smtpTrans.sendMail(mailOpts, function(error, res){
        if(error){
            console.log("send mail error");
            console.log("Contact-failure");
            console.log(error);
        }
    });
}

module.exports = router;