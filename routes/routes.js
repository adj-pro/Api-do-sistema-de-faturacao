const jwt = require("jsonwebtoken");
const { jwt_key } = require("../.env");

module.exports = (app) => {
  const { User } = app.app.models.User;

  app.get("/", async function (req, res) {
    try {
      return res.send({ message: "Servidor rodando 2.1" });
    } catch (err) {
      console.log("in running server : ", err);
      return res.status(400).send({ error: "Error in running server.", err });
    }
  });

  // definindo rotas de registro e autenticacao
  app.post("/register", app.app.controllers.userController.register);
  app.post("/auth", app.app.controllers.userController.auth);


};
