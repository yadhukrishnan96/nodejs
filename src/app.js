const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const dotenv = require("dotenv");

dotenv.config();

// console.log("ENV CONNECTION =", process.env.CONNECTION);
mongoose.set("strictQuery", false);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: "Ravi Shah",
    age: 32,
  },
  {
    name: "Meera Iyer",
    age: 27,
  },
  {
    name: "Karan Patel",
    age: 41,
  },
];

const customer = new Customer({
  name: "yadhu",
  age: 29,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/customers", async (req, res) => {
  console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json(customer);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async  (req, res) => {
 res.json({ requestParams: req.params, requestQuery: req.query });
});

const start = async () => {t
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
