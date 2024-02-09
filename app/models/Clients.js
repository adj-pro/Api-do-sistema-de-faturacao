const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const ClientsSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: false,
      minLength: 9,
    },
    address: {
      type: string,
      required: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Clients = mongoose.model("Clients", ClientsSchema);

  return { Clients };
};
