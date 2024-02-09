const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const CategorySchema = new Schema({
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

  const Category = mongoose.model("Category", CategorySchema);

  return { Category };
};
