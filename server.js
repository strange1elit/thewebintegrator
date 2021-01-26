const express = require('express')
const bodyparser = require('body-parser')
const path = require('path') 
const env = require('dotenv').config()
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const { getMaxListeners, domain, send } = require('process')



const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.render('index', { message: ''})
})

app.get('/user/form/submission', (req, res) => {
    res.render('./partials/messages')
})


app.get('/webdesign', (req, res) => {
    res.render('webdesign')
})
app.get('/logo', (req, res) => {
    res.render('logo')
})

app.get('/seo', (req, res) => {
    res.render('seo')
})

app.get('/illustration', (req, res) => {
    res.render('illustration')
})

app.get('/faq', (req, res) => {
    res.render('faq')
})


app.post('/submit', (req, res) => {
        const output = `
    <p>You have new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Email: ${req.body.email}</li>
    <li>Service: ${req.body.service}</li>
    </ul>
    <h3>message</h3>
    <p>${req.body.message}</p>
    `;

const auth = {
  auth: {
    api_key: process.env.API_KEY,  // generated ethereal password
    domain: process.env.DOMAIN
  }
}

    let transporter = nodemailer.createTransport(mailGun(auth))
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: req.body.email, // sender address
        to: "webintegrator135@gmail.com", // list of receivers
        subject: 'Business Contact', // Subject line
        text: 'hii!!!', // plain text body
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
    res.render('showmessage', { message: 'Your message has been sent!!'})
})


app.use((req, res) => {
    res.status(404).send('<h1> 404 page not found')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is started and running on PORT ${PORT}`))