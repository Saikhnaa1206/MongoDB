const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://saikhnaa:es101206@test1.xs1k1.mongodb.net/?retryWrites=true&w=majority&appName=TEST1"
);
let db;
const connectToDb = () => {
  try {
    client.connect();
    db = client.db("sample_mflix");
    console.log("Connected to database.");
  } catch (error) {
    console.log(error, "failed to connect");
  }
};
connectToDb();
const signup = async (req, res) => {
  const { password, name, email } = req.body;
  try {
    const response = await db.collection("users").insertOne({
      name,
      email,
      password: password,
    });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("failed to create user");
  }
};
const login = async (req, res) => {
  res.send("log in successful");
};
const deleteUser = async (req, res) => {
  res.send("deleted");
};
module.exports = { signup, login, deleteUser };
