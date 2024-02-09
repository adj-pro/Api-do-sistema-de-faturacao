const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = () => {
  const BuySchema = new Schema({
    periodo: {
      start: { type: Date, required: true },
      end: { type: Date, required: false },
    },
    total_buy: { type: Number, required: true },
    buy_by_produt: [
      {
        produt: { type: String, required: true },
        quantity: { type: Number, required: true },
        total_value: { type: Number, required: true },
      },
    ],
    buy_by_client: [
      {
        client: { type: String, required: true },
        total_value: { type: Number, required: true },
      },
    ],
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

  const Buy = mongoose.model("Buy", BuySchema);

  return { Buy };
};
