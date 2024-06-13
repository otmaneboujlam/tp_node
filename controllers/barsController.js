const Bar = require("../models/bars");

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
  const { name, address, tel, email, description } = req.body;
  Bar.create({
    name: name,
    address: address,
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

exports.updateBar = (req, res) => {
  const id = req.params.id;
  const { name, address, tel, email, description } = req.body;
  Bar.update(
    {
      name: name,
      address: address,
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
