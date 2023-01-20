const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: String,
  expira: Date,
  imagen: String,
});

// Metodo para hasher los passwords
usuarioSchema.pre("save", async function (next) {
  // si el password ya esta hasheado
  if (!this.isModified("password")) {
    return next();
  }

  // si no esta hasheado
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

// Envia alerta cuando un usuario ya esta registrado
usuarioSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next("Ese correo ya esta registrado");
  } else {
    next(error);
  }
});

// Autenticar Usuarios
usuarioSchema.methods = {
  compararPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
};

module.exports = mongoose.model("Usuario", usuarioSchema);
