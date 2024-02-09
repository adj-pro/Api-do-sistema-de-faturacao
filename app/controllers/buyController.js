var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync("./template/factura.html", "utf8");

module.exports = (app) => {
  const { Product } = app.app.models.Product;
  const { Company } = app.app.models.Company;
  const { Buy } = app.app.models.Buy;

  // create buy
  // const create = async (req, res) => {
  //   const {
  //     product,
  //     discount,
  //     quantity,
  //     total,
  //     observation,
  //     docs_type,
  //     payments_type,
  //     client,
  //   } = req.body;

  //   try {
  //     const _company = await Company.find({})
  //       .where("user_id")
  //       .equals(req.userId)
  //       .populate("user_id");

  //     console.log("_company : ", _company);

  //     const products = await Product.findById(product);
  //     products.purchase_number += 1;

  //     // get date today
  //     // const date = new Date()
  //     // const today = date.now()

  //     const novaVenda = new Venda({
  //       periodo: {
  //         start: new Date(),
  //         // end: new Date(),
  //       },
  //       total_buy: 0,
  //       buy_by_produt: [ 
  //         {
  //           produto: "Produto A",
  //           quantity: 2,
  //           total_value: 50,
  //         },
  //       ],
  //       buy_by_client: [
  //         {
  //           client: "Cliente X",
  //           total_value: 100,
  //         },
  //       ],
  //     });

  //     novaVenda.save().then(console.log);

  //     await buy.save();
  //     await products.save();

  //     var options = {
  //       format: "A3",
  //       orientation: "portrait",
  //       border: "10mm",
  //       header: {
  //         height: "45mm",
  //         contents:
  //           '<div style="text-align: center;">Author: Shyam Hajare</div>',
  //       },
  //       footer: {
  //         height: "28mm",
  //         contents: {
  //           first: "Cover page",
  //           2: "Second page", // Any page number is working. 1-based index
  //           default:
  //             '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
  //           last: "Last Page",
  //         },
  //       },
  //     };

  //     var users = [
  //       {
  //         name: "Shyam",
  //         age: "26",
  //       },
  //       {
  //         name: "Navjot",
  //         age: "26",
  //       },
  //       {
  //         name: "Vitthal",
  //         age: "26",
  //       },
  //     ];
  //     var document = {
  //       html: html,
  //       data: {
  //         users: users,
  //       },
  //       path: `./output/${g}.pdf`,
  //       type: "",
  //     };
  //     pdf
  //       .create(document, options)
  //       .then((res) => {
  //         console.log("Pdf criado com sucesso : ", res);
  //       })
  //       .catch((error) => {
  //         console.error("Erro em criar o pdf : ", error);
  //       });

  //     return res.status(201).send({
  //       buy,
  //     });
  //   } catch (err) {
  //     console.log("error in register of the buy : ", err);
  //     return res.status(400).send({ error: "Registration buy failed : ", err });
  //   }
  // };

  // create buy
  // const create = async (req, res) => {
  //   const {
  //     product,
  //     discount,
  //     quantity,
  //     total,
  //     observation,
  //     docs_type,
  //     payments_type,
  //     client,
  //   } = req.body;

  //   try {
  //     const _company = await Company.find({})
  //       .where("user_id")
  //       .equals(req.userId)
  //       .populate("user_id");

  //     console.log("_company : ", _company);

  //     const products = await Product.findById(product);
  //     products.purchase_number += 1;

  //     const buy = new Buy({
  //         company: _company._id,
  //         product,
  //         discount,
  //         quantity,
  //         total,
  //         observation,
  //         docs_type,
  //         payments_type,
  //         client,
  //       });

  //       await buy.save();
  //       await products.save();

  //     var options = {
  //       format: "A3",
  //       orientation: "portrait",
  //       border: "10mm",
  //       header: {
  //         height: "45mm",
  //         contents:
  //           '<div style="text-align: center;">Author: Shyam Hajare</div>',
  //       },
  //       footer: {
  //         height: "28mm",
  //         contents: {
  //           first: "Cover page",
  //           2: "Second page", // Any page number is working. 1-based index
  //           default:
  //             '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
  //           last: "Last Page",
  //         },
  //       },
  //     };

  //     var users = [
  //       {
  //         name: "Shyam",
  //         age: "26",
  //       },
  //       {
  //         name: "Navjot",
  //         age: "26",
  //       },
  //       {
  //         name: "Vitthal",
  //         age: "26",
  //       },
  //     ];
  //     var document = {
  //       html: html,
  //       data: {
  //         users: users,
  //       },
  //       path: `./output/${g}.pdf`,
  //       type: "",
  //     };
  //     pdf
  //       .create(document, options)
  //       .then((res) => {
  //         console.log('Pdf criado com sucesso : ', res);
  //       })
  //       .catch((error) => {
  //         console.error('Erro em criar o pdf : ', error);
  //       });

  //     return res.status(201).send({
  //       buy,
  //     });
  //   } catch (err) {
  //     console.log("error in register of the buy : ", err);
  //     return res.status(400).send({ error: "Registration buy failed : ", err });
  //   }
  // };

  // // list all buy
  // const getAll = async (req, res) => {
  //   try {
  //     const _company = await Company.find({})
  //       .where("user_id")
  //       .equals(req.userId)
  //       .populate("user_id");
  //     const buy = await Buy.find({})
  //       .where("company")
  //       .equals(_company._id)
  //       .populate("company");

  //     return res.send({ buy });
  //   } catch (err) {
  //     return res.status(400).send({ error: "Error loading buy." });
  //   }
  // };

  // // get one buy
  // const getOne = async (req, res) => {
  //   try {
  //     const buy = await Buy.findById(req.params.id);
  //     return res.send({ buy });
  //   } catch (err) {
  //     console.log("error in show one buy : ", err);
  //     return res.status(400).send({ error: "error in show one buy" });
  //   }
  // };

  // // delete buy
  // const remove = async (req, res) => {
  //   try {
  //     await Buy.findByIdAndRemove(req.params.id);

  //     return res.status(200).send({ message: "Buy successfully removed!" });
  //   } catch (err) {
  //     return res.status(400).send({ error: "Error loading Buy." });
  //   }
  // };

  // // Edit one buy
  // const update = async (req, res) => {
  //   const { name } = req.body;

  //   try {
  //     const buy = await Buy.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         name,
  //       },
  //       { new: true }
  //     );

  //     console.log("buy edit : ", buy);

  //     // await category.save();

  //     return res.status(200).send({
  //       buy,
  //     });
  //   } catch (err) {
  //     console.log("error in edit of the buy : ", err);
  //     return res.status(400).send({ error: "Edit buy failed : ", err });
  //   }
  // };

  return {
    // create,
    // remove,
    // getAll,
    // getOne,
    // update,
  };
};
