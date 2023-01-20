const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const createError = require("http-errors");
const router = require("./routes");
const { dbConnection } = require("./config/db");
const passport = require("./config/passport");

const app = express();

// Habilitar lectura de datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base de datos
dbConnection();

// Habilitar Handlebars como view
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "handlebars");

// static files
app.use(express.static("public"));

// Habilitar Cookie Parser
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
});

app.use("/", router());

// 404 pagina no existente
app.use((req, res, next) => {
  next(createError(404, "No Encontrado"));
});

// Administración de los errores
app.use((error, req, res, next) => {
  res.locals.mensaje = error.message;
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);

  res.render("error");
});

app.listen(process.env.PUERTO);
