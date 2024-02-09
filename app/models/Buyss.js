const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const BuySchema = new Schema({
    client: {
      type: String,
      required: true,
    },
    payments_type: {
      type: String,
      required: true,
    },
    docs_type: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
      required: true,
    },
    total_value: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
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

  const Buyss = mongoose.model("Buyss", BuySchema);

  return { Buyss };
};
