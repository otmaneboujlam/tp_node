const Bar = require("../models/bars");
const bcrypt = require('bcrypt');
const Commande = require("../models/order");
const Biere = require("../models/biere");

exports.getAllBars = (req, res) => {
  Bar.findAll()
    .then((bars) => {
      res.json(bars);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getBarById = (req, res) => {
  const id = req.params.id;
  Bar.findByPk(id)
    .then((bar) => {
      if (bar === null) {
        res.status(404).json({ error: "Bar not found" });
      } else {
        res.json(bar);
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.createBar = (req, res) => {
  const { name, adresse, tel, email, description } = req.body;
  Bar.create({
    name: name,
    adresse: adresse,
    tel: tel,
    email: email,
    description: description,
  })
    .then((bar) => {
      res.status(201).json(bar);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.updateBar = async (req, res) => {
  const id = req.params.id;
  const { name, adresse, tel, email, description } = req.body;
  Bar.update(
    {
      name: name,
      adresse: adresse,
      tel: tel,
      email: email,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.deleteBar = (req, res) => {
  const id = req.params.id;
  Bar.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getCommandes = (req, res) => {
  const { id } = req.params;
  const { date, prix_min, prix_max } = req.query;

  Commande.findAll({
    where: {
      barId: id,
      ...(date && { date }),
      ...(prix_min && { prix: { [Op.gte]: parseFloat(prix_min) } }),
      ...(prix_max && { prix: { [Op.lte]: parseFloat(prix_max) } }),
    },
  })
    .then((commandes) => {
      res.json(commandes);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getDegree = (req, res) => {
  const { id } = req.params;

  Biere.findAll({
    where: { barId: id },
    attributes: [[sequelize.fn("AVG", sequelize.col("degree")), "avgDegree"]],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.searchBars = (req, res) => {
  const { ville, name } = req.query;

  Bar.findAll({
    where: {
      ...(ville && { ville: { [Op.like]: `%${ville}%` } }),
      ...(name && { name: { [Op.like]: `%${name}%` } }),
    },
  })
    .then((bars) => {
      res.json(bars);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
