const express = require("express");
const {
  autenticarUsuario,
  verificarUsuario,
  mostrarPanel,
  cerrarSesion,
  formReestablecerPassword,
  enviarToken,
  reestablecerPassword,
  guardarPassword,
} = require("../controllers/authController");
const { mostrarTrabajos } = require("../controllers/homeController");
const {
  subirImagen,
  formCrearCuenta,
  validarRegistro,
  crearUsuario,
  formIniciarSesion,
  formEditarPerfil,
  editarPerfil,
  validarPerfil,
} = require("../controllers/usuariosController");
const {
  formularioNuevaVacante,
  agregarVacantes,
  mostrarVacante,
  formEditarVacante,
  editarVacante,
  validarVacantes,
  eliminarVacante,
  subirCV,
  contactar,
  mostrarCandidatos,
  buscarVacantes,
} = require("../controllers/vacantesController");
const router = express.Router();

module.exports = () => {
  router.get("/", mostrarTrabajos);

  // Crear Vacantes
  router.get("/vacantes/nueva", verificarUsuario, formularioNuevaVacante);
  router.post("/vacantes/nueva", verificarUsuario, agregarVacantes); //validarVacantes,

  // Mostrar Vacante (Singular)
  router.get("/vacantes/:url", mostrarVacante);

  // Editar Vacante
  router.get("/vacantes/editar/:url", verificarUsuario, formEditarVacante);
  router.post(
    "/vacantes/editar/:url",
    verificarUsuario,
    validarVacantes,
    editarVacante
  );

  // Eliminar vacantes
  router.delete("/vacantes/eliminar/:id", eliminarVacante);

  // Crear Cuentas
  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", validarRegistro, crearUsuario);

  // Autenticar Usuarios
  router.get("/iniciar-sesion", formIniciarSesion);
  router.post("/iniciar-sesion", autenticarUsuario);

  // Cerrar Sesion
  router.get("/cerrar-sesion", verificarUsuario, cerrarSesion);

  // Resetaear password (emails)
  router.get("/reestablecer-password", formReestablecerPassword);
  router.post("/reestablecer-password", enviarToken);

  // Resetear Password ( Almacenar en la BD )
  router.get("/reestablecer-password/:token", reestablecerPassword);
  router.post("/reestablecer-password/:token", guardarPassword);

  // Panel de administración
  router.get("/administracion", verificarUsuario, mostrarPanel);

  // Editar perfil
  router.get("/editar-perfil", verificarUsuario, formEditarPerfil);
  router.post("/editar-perfil", verificarUsuario, subirImagen, editarPerfil); //validarPerfil

  // Recibir mensajes de candidatos
  router.post("/vacantes/:url", subirCV, contactar);

  // Muestra los candidatos por vacante
  router.get("/candidatos/:id", verificarUsuario, mostrarCandidatos);

  // Buscador de Vacantes
  router.post("/buscador", buscarVacantes);

  return router;
};
