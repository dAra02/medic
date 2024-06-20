const Application = require("./models/Form");

async function getZaivka() {
  const zaivki = await Application.find();

  return zaivki;
}

module.exports = {
  getZaivka,
};
