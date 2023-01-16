// const express = require("express");

// const cors = require("cors");

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// const products = require("./Products.json");

// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get("/products", (req, res) => {
//   res.send(products);
// });

// app.get("/products/:id", (req, res) => {
//   const id = Number(req.params.id);
//   res.send(products[id - 1]);
// });

// app.listen(PORT, (req, res) => {
//   console.log(`server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const lists = require("./lists.json");
const stripe = Stripe(
  "sk_test_51KqJ4DAAUyqQ9D2QYq0XQgT5fpbO2LfNOUbdF8sCPhfMnC1WmFkr2LEbn6aOibauP8EHT7R53cPIX3bT39EI8mCk00IQcYDpqP",
  { apiVersion: "2020-08-27" }
);

const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));

const PORT = process.env.PORT || 5000;

app.post("/payment", async (req, res) => {
  const { totalAmount, totalItemsPurchased } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "usd",
      description: `The total coffees purchased are ${totalItemsPurchased}`,
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.get("/products", (req, res) => {
	res.send(products);
});

app.listen(PORT, (req, res) => {
console.log(`server running on port ${PORT}`);
});
