const users = require("../drizzle/schema").usersTable;
const bcrypt = require("bcrypt");
const db = require("../drizzle/db").db;
const jwt = require("jsonwebtoken");

exports.getRegisterForm = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postRegister = async (req, res) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where({ username: req.body.username });

    if (user.length) {
      return res.status(400).json({
        error: "user_already_exist",
        message: "Username already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insert(users).values({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    res.redirect("/auth/login");
  } catch (error) {
    return res.status(500).json({
      error: "server_error",
      message: "Internal Server Error",
    });
  }
};

exports.getLoginForm = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where({ username: req.body.username });

    if (!user.length) {
      return res.redirect("/auth/login");
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      return res.redirect("/auth/login");
    }

    const username = user[0].username;
    const userId = user[0].id;
    const accessToken = jwt.sign(
      { username, userId },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};
