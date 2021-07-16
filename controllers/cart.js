const Cart = require("../models/cart");
exports.CartController = async (req, res) => {
  try {
    const findedCart = await Cart.findOne({ user: req.user.id });

    if (findedCart) {
      const product = req.body.cartItems.product;

      const sameProduct = findedCart.cartItems.find(
        (c) => c.product == product
      );
      if (sameProduct) {
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user.id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: sameProduct.quantity + req.body.cartItems.quantity,
                price: sameProduct.price + req.body.cartItems.price,
              },
            },
          },
          { new: true }
        );

        console.log(updatedCart.populate("cartItems.product"));

        res.status(200).json({ updatedCart });
      } else {
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user.id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          { new: true }
        );
        console.log(updatedCart.populate("cartItems.product"));

        res.status(200).json({ updatedCart });
      }
    } else {
      // console.log(req.body.cartItems);
      const cart = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });
      await cart.save();

      res.json({ cart });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.getCartsItems = async (req, res) => {
  const findedCart = await Cart.findOne({ user: req.user.id }).populate(
    "cartItems.product",
    ["name"]
  );

  console.log(findedCart);
  return res.json({ findedCart });
};
