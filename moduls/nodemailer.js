const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jess.johns@ethereal.email',
        pass: 'CMnTYwCccFrpjUVdts'
    }
}, {
    from: '"Fred Foo 👻" <jess.johns@ethereal.email>'
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log(info);
    })
}

module.exports = mailer;

