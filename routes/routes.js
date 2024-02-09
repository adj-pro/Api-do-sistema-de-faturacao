// config multer and firebase
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = require("../services/firebase");

module.exports = (app) => {
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

  // definindo rotas de empresas
  app
    .route("/company")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.companyController.getOne)
    .post(app.app.controllers.companyController.register);

  app
    .route("/company/:id")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .put(app.app.controllers.companyController.update);

  // definindo rotas de categorias
  app
    .route("/category")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.categoryController.getAll)
    .post(app.app.controllers.categoryController.create);

  app
    .route("/category/:id")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.categoryController.getOne)
    .put(app.app.controllers.categoryController.update)
    .delete(app.app.controllers.categoryController.remove);

  // definindo rotas de marcas
  app
    .route("/brand")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.brandController.getAll)
    .post(app.app.controllers.brandController.create);

  app
    .route("/brand/:id")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.brandController.getOne)
    .put(app.app.controllers.brandController.update)
    .delete(app.app.controllers.brandController.remove);

  // definindo rotas de produtos
  app
    .route("/product", upload.single("image"), uploadFile)
    .all(app.app.middlewares.authToken.authenticationJWT)
    .post(app.app.controllers.productController.create);

  app
    .route("/product")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.productController.getAll);
  // .post(app.app.controllers.productController.create);

  app
    .route("/product-more-purchased")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.productController.getProductMorePurchased);

  app
    .route("/product/:id", upload.single("image"), uploadFile)
    .all(app.app.middlewares.authToken.authenticationJWT)
    .put(app.app.controllers.productController.update);

  app
    .route("/product/:id")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.productController.getOne)
    // .put(app.app.controllers.productController.update)
    .delete(app.app.controllers.productController.remove);

  // definindo rotas de clientes
  app
    .route("/client")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.clientsController.getAll)
    .post(app.app.controllers.clientsController.register);

  app
    .route("/client/:id")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.clientsController.profile)
    .put(app.app.controllers.clientsController.update)
    .delete(app.app.controllers.clientsController.remove);

  // definindo rotas de vendas e relatorios
  app
    .route("/product-with-low-stock")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.productController.getAllProductWithLowStock);

  app
    .route("/out-of-stock-product")
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.productController.getAllOutOfStockProduct);

  // app
    // .route("/buy")
    // .all(app.app.middlewares.authToken.authenticationJWT)
    // .get(app.app.controllers.productController.getAll)
    // .post(app.app.controllers.buyController.create);

  // app
  //   .route("/product-more-purchased")
  //   .all(app.app.middlewares.authToken.authenticationJWT)
  //   .get(app.app.controllers.productController.getProductMorePurchased);

  // app
  //   .route("/product/:id")
  //   .all(app.app.middlewares.authToken.authenticationJWT)
  //   .get(app.app.controllers.productController.getOne)
  //   .put(app.app.controllers.productController.update)
  //   .delete(app.app.controllers.productController.remove);
};
