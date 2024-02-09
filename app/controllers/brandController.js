module.exports = (app) => {
  const { User } = app.app.models.User;
  const { Company } = app.app.models.Company;
  const { Brand } = app.app.models.Brand;

  // create brand
  const create = async (req, res) => {
    const { name } = req.body;

    try {
      if (await Brand.findOne({ name })) {
        return res.status(401).send({ error: "Brand already exist" });
      }

      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      console.log("_company : ", _company);

      const brand = new Brand({
        company: _company._id,
        name,
      });

      await brand.save();

      return res.status(201).send({
        brand,
      });
    } catch (err) {
      console.log("error in register of the brand : ", err);
      return res
        .status(400)
        .send({ error: "Registration brand failed : ", err });
    }
  };

  // list all brand
  const getAll = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");
      const brand = await Brand.find({})
        .where("company")
        .equals(_company._id)
        .populate("company");

      return res.send({ brand });
    } catch (err) {
      return res.status(400).send({ error: "Error loading brand." });
    }
  };

  // get one brand
  const getOne = async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      return res.send({ brand });
    } catch (err) {
      console.log("error in show one brand : ", err);
      return res.status(400).send({ error: "error in show one brand" });
    }
  };

  // delete brand
  const remove = async (req, res) => {
    try {
      await Brand.findByIdAndRemove(req.params.id);

      return res
        .status(200)
        .send({ message: "Brand successfully removed!" });
    } catch (err) {
      return res.status(400).send({ error: "Error loading Brand." });
    }
  };

  // Edit one brand
  const update = async (req, res) => {
    const { name } = req.body;

    try {
      const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
          name,
        },
        { new: true }
      );

      console.log("brand edit : ", brand);

      // await category.save();

      return res.status(200).send({
        brand,
      });
    } catch (err) {
      console.log("error in edit of the brand : ", err);
      return res.status(400).send({ error: "Edit brand failed : ", err });
    }
  };

  return {
    create,
    remove,
    getAll,
    getOne,
    update,
  };
};
