const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer= require("nodemailer");

const port = process.env.PORT || 5000

const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use("/api", router);
app.listen(port, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "henryz19151@gmail.com",
        pass: 'rdinmvkqeqhhnlnc',
    },
});

contactEmail.verify((error) => {
    if (error){
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/api/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "henryz19151@gmail.com",
        subject: `New Message From: ${name}`,
        html: `<h2>Name: ${name}</h2>
                <h2>Email: ${email}</h2>
                <h3>Msg: ${message}</h3>`
    };
    contactEmail.sendMail(mail, (error) => {
        if (error){
            res.json({ status: "Something went wrong." })
        } else {
            res.json({ status: "Thanks for the message!" });
        }
    });
});

