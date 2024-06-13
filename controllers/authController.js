const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const bar = await Bar.findOne({ where: { email } });
  
      if (!bar || !await bcrypt.compare(password, bar.password)) {
        return res.status(401).json({ error: 'Mot de passe ou email invalide' });
      }
  
      const token = jwt.sign({ id: bar.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      await bar.update({ token });
  
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.register = async (req, res) => {
    try {
      const { name, adresse, tel, email, password, description } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const bar = await Bar.create({
        name,
        adresse,
        tel,
        email,
        password: hashedPassword,
        description,
      });
  
      res.status(201).json(bar);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  