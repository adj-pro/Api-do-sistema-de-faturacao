const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const BrandSchema = new Schema({
    name: {
      type: String,
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

  const Brand = mongoose.model("Brand", BrandSchema);

  return { Brand };
};
