module.exports = (app) => {
  const { User } = app.app.models.User;
  const { Product } = app.app.models.Product;
  const { Company } = app.app.models.Company;
  const { Brand } = app.app.models.Brand;

  // create product
  const create = async (req, res) => {
    const {
      name,
      category,
      brand,
      quantity,
      price_f,
      price,
      reference,
      description,
      image,
    } = req.body;

    try {
      if (await Product.findOne({ name })) {
        return res.status(401).send({ error: "Product already exist" });
      }
      let photo;
      if (req.files) {
        const { firebaseUrl } = req.files;
        photo = firebaseUrl;
      }
      console.log('photo : ', photo)

      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      console.log("_company product : ", _company);

      const product = new Product({
        company: _company._id,
        name,
        category,
        brand,
        quantity,
        price_f,
        price,
        reference,
        description,
        image: photo,
      });

      await product.save();

      return res.status(201).send({
        product,
      });
    } catch (err) {
      console.log("error in register of the product : ", err);
      return res
        .status(400)
        .send({ error: "Registration product failed : ", err });
    }
  };

  // list all product
  const getAll = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");
      const product = await Product.find({})
        .where("company")
        .equals(_company._id)
        .populate(["company", "category", "brand"]);

      return res.send({ product });
    } catch (err) {
      return res.status(400).send({ error: "Error loading product." });
    }
  };

  // get one product
  const getOne = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      const product = await Product.find({
        $and: [{ company: _company._id }, { id: req.params.id }],
      });
      // const product = await Product.findById(req.params.id);
      return res.send({ product });
    } catch (err) {
      console.log("error in show one product : ", err);
      return res.status(400).send({ error: "error in show one product" });
    }
  };

  // returns five product more purchased
  const getProductMorePurchased = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      const product = await Product.find({
        $and: [{ company: _company._id }],
      }).sort({ purchase_number: -1 });

      return res.status(200).send({ product });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Error in returns five product more purchased." });
    }
  };

  // Returns all products with low stock
  const getAllProductWithLowStock = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      const product = await Product.find({
        $and: [{ company: _company._id }],
      }).sort({ quantity: 1 });
      return res.status(200).send({ product });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Error in Returns all products with low stock." });
    }
  };

  // Returns all out-of-stock products
  const getAllOutOfStockProduct = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      const product = await Product.find({
        $and: [{ company: _company._id }, { quantity: { $lte: 0 } }],
      });
      return res.status(200).send({ product });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Error in Returns all out-of-stock products." });
    }
  };

  // search product
  // const search = async (req, res) => {
  //   try {
  //     const _company = await Company.find({})
  //       .where("user_id")
  //       .equals(req.userId)
  //       .populate("user_id");
  //     const product = await Product.find({})
  //       .where("company")
  //       .equals(_company._id)
  //       .populate(["company", "category", "brand"]);

  //     return res.send({ product });
  //   } catch (err) {
  //     return res.status(400).send({ error: "Error loading product." });
  //   }
  // };

  // delete product
  const remove = async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id);

      return res.status(200).send({ message: "Product successfully removed!" });
    } catch (err) {
      return res.status(400).send({ error: "Error loading product." });
    }
  };

  // Edit one product
  const update = async (req, res) => {
    const {
      name,
      category,
      brand,
      quantity,
      price_f,
      price,
      reference,
      description,
      image,
    } = req.body;

    try {
      let photo;
      if (req.files) {
        const { firebaseUrl } = req.files;
        photo = firebaseUrl;
      }
      console.log("photo : ", photo);
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          brand,
          quantity,
          price_f,
          price,
          reference,
          description,
          image: photo,
        },
        { new: true }
      );

      console.log("product edit : ", product);

      // await category.save();

      return res.status(200).send({
        product,
      });
    } catch (err) {
      console.log("error in edit of the product : ", err);
      return res.status(400).send({ error: "Edit product failed : ", err });
    }
  };

  return {
    create,
    remove,
    getAll,
    getProductMorePurchased,
    getAllProductWithLowStock,
    getAllOutOfStockProduct,
    getOne,
    update,
  };
};
