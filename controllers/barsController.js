const Bar = require("../models/bars");
const bcrypt = require("bcrypt");

const getAllBars = (req, res) => {
  Bar.findAll()
    .then((bars) => {
      res.json(bars);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

const getBarById = (req, res) => {
  const id = req.params.id_bar;
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

const createBar = (req, res) => {
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

const updateBar = async (req, res) => {
  const id = req.params.id_bar;
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
      res.status(200).send({ message: "le bar à été modifié" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

const deleteBar = (req, res) => {
  const id = req.params.id_bar;
  Bar.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "le bar à été supprimé" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  deleteBar,
  updateBar,
  createBar,
  getBarById,
  getAllBars,
};
