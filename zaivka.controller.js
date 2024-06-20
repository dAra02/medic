const Application = require("./models/Form");
const chalk = require("chalk");

async function addZaivka(name, phone, problem) {
  await Application.create({ name, phone, problem });

  console.log(chalk.bgGreen("Zaivka was added!"));
}

module.exports = {
  addZaivka,
};
