const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const transporter = require('../config/nodemailer');
const User = require('../models/User'); // Ajusta según tu modelo de usuario

// Ruta para mostrar el formulario de recuperación de contraseña
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { messages: req.flash() });
});

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    req.flash('error', 'El correo electrónico no está registrado.');
    return res.redirect('/auth/forgot-password'); // Ajusta esta ruta según tu vista
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();
  console.log("------------------------------------->>>>>>>>>>>>>>>")
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Restablecer contraseña',
    text: `Recibiste esto porque tú (u otra persona) solicitaste restablecer la contraseña de tu cuenta.\n\n
           Haz clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:\n\n
           http://${req.headers.host}/auth/reset-password/${token}\n\n
           Si no solicitaste esto, ignora este correo y tu contraseña permanecerá sin cambios.\n`
  };
  console.log(mailOptions.text)

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('error', 'Error al enviar el correo electrónico en Transporter.');
      return res.redirect('/auth/forgot-password'); // Ajusta esta ruta según tu vista
    }
    req.flash('success', 'Correo electrónico enviado con éxito.');
    res.redirect('/auth/forgot-password'); // Ajusta esta ruta según tu vista
  });
});

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() }
    }
  });

  if (!user) {
    req.flash('error', 'El token de recuperación es inválido o ha expirado.');
    return res.redirect('/auth/forgot-password');
  }

  res.render('reset-password', { token, messages: req.flash() });
});

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() }
    }
  });

  if (!user) {
    req.flash('error', 'El token de recuperación es inválido o ha expirado.');
    return res.redirect('/auth/forgot-password'); // Ajusta esta ruta según tu vista
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  req.flash('success', 'Contraseña restablecida con éxito.');
  res.redirect('/login'); // Ajusta esta ruta según tu vista
});

module.exports = router;
