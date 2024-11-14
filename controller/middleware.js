const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
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

const signupmiddle = async (req, res, next) => {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  next();
};

const loginmiddle = async (req, res, next) => {
  const body = req.body;
  const { password, email } = body;
  const user = await db.collection("users").findOne({ email });
  if (user) {
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (validPassword) {
      next();
    } else {
      res.send("wrong password or email");
    }
  } else {
    res.send("wrong email");
  }
};

const deletemiddle = (req, res, next) => {
  try {
    db.collection("users").deleteOne({ _id: new ObjectId(req.body.id) });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginmiddle, deletemiddle, signupmiddle };
