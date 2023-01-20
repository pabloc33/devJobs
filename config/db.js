const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "variables.env" });

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar DB");
  }
};

// importar los modelos
require("../models/Usuarios");
require("../models/Vacantes");

module.exports = { dbConnection };
