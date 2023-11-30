const user = require("../Models/userSchema");

const verifyAdmin = async (req, res, next) => {
  const email = req.user.email;
  const query = { email: email };
  const myuser = await user.findOne(query);
  const isAdmin = myuser?.role === "admin";
  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};
module.exports = verifyAdmin;
