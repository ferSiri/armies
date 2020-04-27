"use strict";
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

function sendEMail(email, id, URL) {
    var _email = email;
    var _id = id;

    async function main(_email, _id) {
        const emailToken = jwt.sign(
            { user: id },
            process.env.S_NODEMAIL,
            { expiresIn: '1d' }
        );

        const _url = `http://localhost:5000/api/confirmation/${emailToken}`;


        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_P
            }
        });

        let info = await transporter.sendMail({
            from: '"Mi App 👻" <noresponder@miapp.com>', // sender address
            to: email, // list of receivers
            subject: "Confirmar registro", // Subject line
            text: "Hello world?", // plain text body
            html: `Haga click en este link para confirmar su email: <a href="${_url}">${_url}</a>` // html body
        });
    }

    main().catch(console.error);
}

module.exports = { sendEMail };