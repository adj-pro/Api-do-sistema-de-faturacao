const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const ProductSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    reference: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    price_f: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    purchase_number: {
      type: Number,
      default: 0,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Product = mongoose.model("Product", ProductSchema);

  return { Product };
};
