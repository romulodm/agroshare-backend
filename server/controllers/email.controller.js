require('dotenv').config({path:'.env'});
const nodemailer = require("nodemailer");
const redisClient = require('../../config/redis')

const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_NAME}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

exports.passwordCode = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    try {

        // Saving the code in redis
        await redisClient.setEx(`resetCode:${email}`, 900, code.toString());

        const mailOptions = {
            from: `${process.env.EMAIL_NAME}`,
            to: req.body.email,
            subject: "Redefinição de senha - AgroShare",
            html:`
            <body style="margin: 0; padding: 0;">
            <table class="outer table" style="border-spacing: 15px;" align="center" border="0" cellpadding="0" cellspacing="0" width="600" >
                <tr class="content">
                <td style="padding: 0px 15px; border: 0.5px solid #CECECE; border-radius: 5px;" bgcolor="#ffffff">
                    <table border="0" width="100%">
                    <tr>
                        <td>
                        <p align="center" style="color: #000000; font-size: 20px; font-weight: bold;">Use o código abaixo para resetar a sua senha:</p>
                    
                        <div style="width: 300px; border: none; border-radius: 5px; background-color: #00C74D; color: white; font-size: 30px; font-weight: bold; text-align: center; margin: 0 auto;">
                            <div align="center" style="padding: 10px 0px 10px 0px;">${code}</div>
                        </div>

                        <br>

                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
                <tr class="footer">
                <td align="center" bgcolor="#000000" style="padding: 1px 0px; font-size: 1em; border-radius: 5px;">
                    <p style="color: #ffffff;">&reg; AgroShare 2025</p>
                </td>
                </tr>
            </table>
            </body>`,
        };
      
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email enviado com sucesso.'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde!' });
      }
}

