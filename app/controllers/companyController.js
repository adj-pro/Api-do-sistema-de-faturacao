module.exports = (app) => {
  const { User } = app.app.models.User;
  const { Company } = app.app.models.Company;

  // register
  const register = async (req, res) => {
    const { company_name, company_type, nif, phone } = req.body;

    try {
      if (await Company.findOne({ nif })) {
        return res.status(401).send({ error: "Company already exist" });
      }

      const company = new Company({
        company_name,
        company_type,
        nif,
        phone,
        user_id: req.userId,
      });

      await company.save();

      return res.status(201).send({
        company,
      });
    } catch (err) {
      console.log("error in register of the company : ", err);
      return res
        .status(400)
        .send({ error: "Registration company failed : ", err });
    }
  };

  // Edit one company
  const update = async (req, res) => {
    const { company_name, company_type, nif, phone } = req.body;

    try {
      // const isAdmin = await User.findById(req.userId);

      // if (isAdmin.permission !== 1) {
      //   return res
      //     .status(423)
      //     .send({ error: "Permission denied for not being an administrator" });
      // }

      const company = await Company.findByIdAndUpdate(
        req.params.id,
        {
          company_name,
          company_type,
          nif,
          phone,
          // user_id: req.userId,
        },
        { new: true }
      );

      console.log("company : ", company);

      // await company.save();

      return res.status(200).send({
        company,
      });
    } catch (err) {
      console.log("error in register of the company : ", err);
      return res
        .status(400)
        .send({ error: "Registration company failed : ", err });
    }
  };

  // Get one company by user id
  const getOne = async (req, res) => {
    try {
      const company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");
      return res.send({ company });
    } catch (err) {
      console.log("error in show one company by user id : ", err);
      return res
        .status(400)
        .send({ error: "error in show one company by user id" });
    }
  };

  return {
    register,
    getOne,
    update
  };
};
