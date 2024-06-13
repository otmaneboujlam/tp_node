class Bar {
  constructor(id, name, adresse, tel, email, description) {
    this.id = Number(id);
    this.name = String(name);
    this.adresse = String(adresse);
    this.tel = tel !== null ? String(tel) : null;
    this.email = String(email);
    this.description = description !== null ? String(description) : null;
  }
}

module.exports = Bar;
