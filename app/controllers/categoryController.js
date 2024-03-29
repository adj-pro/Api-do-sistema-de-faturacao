module.exports = (app) => {
  const { User } = app.app.models.User;
  const { Company } = app.app.models.Company;
  const { Category } = app.app.models.Category;

  // create category
  const create = async (req, res) => {
    const { name } = req.body;

    try {
      if (await Category.findOne({ name })) {
        return res.status(401).send({ error: "Category already exist" });
      }

      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      _company.for;

      // const arr = []

      let company_user_id = "";
      _company.forEach((result) => {
        console.log("result._id : ", result._id);
        company_user_id = result._id;
      });
      // const as = _company.includes('_id')
      console.log("_company _id : ", _company._id);
      console.log("company_user_id : ", company_user_id);
      console.log("_company user : ", _company.user_id);

      const category = new Category({
        company: company_user_id,
        name,
      });

      await category.save();

      return res.status(201).send({
        category,
      });
    } catch (err) {
      console.log("error in register of the category : ", err);
      return res
        .status(400)
        .send({ error: "Registration category failed : ", err });
    }
  };

  // list all category
  const getAll = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");
      let company_id = "";
      _company.forEach((result) => {
        console.log("result._id : ", result._id);
        company_id = result._id;
      });
      const category = await Category.find({})
        .where("company")
        .equals(company_id)
        .populate("company");

      return res.send({ category });
    } catch (err) {
      return res.status(400).send({ error: "Error loading category." });
    }
  };

  // get one category
  const getOne = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      return res.send({ category });
    } catch (err) {
      console.log("error in show one category : ", err);
      return res.status(400).send({ error: "error in show one category" });
    }
  };

  // delete category
  const remove = async (req, res) => {
    try {
      await Category.findOneAndDelete({ _id: req.params.id });

      return res
        .status(200)
        .send({ message: "Category successfully removed!" });
    } catch (err) {
      console.log('err delete category : ', err);
      return res.status(400).send({ error: "Error loading Category." });
    }
  };

  // Edit one category
  const update = async (req, res) => {
    const { name } = req.body;

    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name,
        },
        { new: true }
      );

      console.log("category edit : ", category);

      // await category.save();

      return res.status(200).send({
        category,
      });
    } catch (err) {
      console.log("error in edit of the category : ", err);
      return res.status(400).send({ error: "Edit category failed : ", err });
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
