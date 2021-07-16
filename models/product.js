const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    pictures: [{ img: { type: String } }],

    shortDetails: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    new: {
      type: Boolean,
    },
    sale: {
      type: Boolean,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    colors: {
      type: Array,
    },
    size: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    rating: {
      type: Number,
    },
    variants: [
      {
        color: {
          type: String,
        },
        images: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
