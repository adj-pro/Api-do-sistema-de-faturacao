module.exports = (app) => {
  const { Clients } = app.app.models.Clients;
  const { Company } = app.app.models.Company;

  // register
  const register = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
      if (await Clients.findOne({ email })) {
        return res.status(401).send({ error: "Clients already exist" });
      }

      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");

      const client = new Clients({
        email,
        name,
        phone,
        address,
        company: _company._id,
      });

      await client.save();

      client.password = undefined;

      return res.status(201).send({
        client,
      });
    } catch (err) {
      console.log("error in register of the client : ", err);
      return res
        .status(400)
        .send({ error: "Registration of client failed : ", err });
    }
  };

  // client profile
  const profile = async (req, res) => {
    try {
      const user = await Clients.findById(req.params.id);
      return res.send({ user });
    } catch (err) {
      console.log("error in show client profile : ", err);
      return res.status(400).send({ error: "error in show client profile" });
    }
  };

  // list all clients
  const getAll = async (req, res) => {
    try {
      const _company = await Company.find({})
        .where("user_id")
        .equals(req.userId)
        .populate("user_id");
      const client = await Clients.find({})
        .where("company")
        .equals(_company._id)
        .populate("company");

      return res.status(200).send({ client });
    } catch (err) {
      return res.status(400).send({ error: "Error loading all client." });
    }
  };

  // Edit one client
  const update = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
      const client = await Clients.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          phone,
          address,
        },
        { new: true }
      );

      console.log("client edit : ", client);

      return res.status(200).send({
        client,
      });
    } catch (err) {
      console.log("error in edit of the client : ", err);
      return res.status(400).send({ error: "Edit client failed : ", err });
    }
  };

  // delete client
  const remove = async (req, res) => {
    try {
      await Clients.findByIdAndRemove(req.params.id);

      return res.status(200).send({ message: "Client successfully removed!" });
    } catch (err) {
      return res.status(400).send({ error: "Error loading Client." });
    }
  };

  return {
    register,
    profile,
    getAll,
    update,
    remove,
  };
};
