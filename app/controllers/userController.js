const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { jwt_key } = require("../../.env");

module.exports = (app) => {
  const { User } = app.app.models.User;

  // generate token
  const generateToken = (params = {}) => {
    return jwt.sign(params, jwt_key, {
      expiresIn: 259200000,
    });
  };

  // register
  const register = async (req, res) => {
    const {name, company, email, nif, password, phone} = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(401).send({ error: 'User already exist' });
        }
        if (await User.findOne({ company })) {
            return res.status(401).send({ error: 'Company already exist' });
        }

        const user = new User({
            email,
            company,
            name,
            phone,
            password,
            nif
          });
    
          await user.save();
    
          user.password = undefined;
    
    
          return res.status(201).send({
            user,
            token: generateToken({ id: user.id }),
          });
        } catch (err) {
          console.log("error in register of the user : ", err);
          return res.status(400).send({ error: "Registration failed : ", err });
        }
  }

  // authenticate
  const auth = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalid password." });
    }

    user.password = undefined;

    res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  };

  // user profile
  const profile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.send({ user });
    } catch (err) {
      console.log("error in show user profile : ", err);
      return res.status(400).send({ error: "error in show user profile" });
    }
  };

  return {
    register,
    auth,
    profile
  }

}