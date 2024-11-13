const User = require('../models/sequelize/user.model');

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try{
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Campos "email" e "password" são obrigatórios.' });
    }

    const user = await User.findOne({ where: { email: req.body.email }, 
        include: [{
            model: UserImage,
            attributes: ['url'],
        }],
    });

    if (!user) {
        return res.status(204).json({ error: "Credenciais incorretas. Verifique seu email e senha." });
    } 

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECURITY_PASS);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
        return res.status(204).json({ error: "Credenciais incorretas. Verifique seu email e senha." });
    }
    
    const accessToken = jwt.sign(
    {
        id: user.id,
    },
        process.env.JWT_SECURITY_PASS,
        {expiresIn:"5d"}
    ); 

    const userJson = JSON.parse(JSON.stringify(user.dataValues));
    const { password, ...others } = userJson;
    
    res.status(200).json({ ...others, accessToken });

  } catch(error){
      res.status(500).json(error);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Campos "email" e "password" são obrigatórios.' });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password, 
      process.env.CRYPTO_SECURITY_PASS).toString();

    const user = await User.create({ email, password: encryptedPassword, ...rest });

    res.status(201).json({ message: "Usuário registrado com sucesso.", user });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(204).json({ error: 'E-mail já está em uso.' });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};


exports.changePassword = async (req, res) => {
  const { email, code, password } = req.body;

  try {
    if (!email || !code || !password) {
      return res.status(400).json({ error: 'Campos "email", "code" e "password" são obrigatórios.' });
    }

    const storedCode = await redisClient.get(`resetCode:${email}`);

    if (!storedCode) {
      return res.status(400).json({ error: 'Código inválido ou expirado.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ error: 'Código inválido.' });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECURITY_PASS).toString();
    
    await User.update({ password: encryptedPassword }, { where: { email } });
    await redisClient.del(`resetCode:${email}`);

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a senha.' });
  }
};