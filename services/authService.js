const userModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const token = require("../utils/token");

async function getUserByUsername(username) {
  try {
    return await userModel.findOne({ username });
  } catch (err) {
    throw err;
  }
}

async function getUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (err) {
    throw err;
  }
}

async function deleteUser(id) {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}

async function registerUser(username, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    // hash a password
    const hashedPassword = await bcrypt.hash(password, salt);
    // generate a token
    const jwtToken = token.generateToken(username);

    // create a new user using mongoose schema from models
    const newUser = await userModel.create({
      username: username,
      password: hashedPassword,
      token: jwtToken,
    });

    return { newUser, token: jwtToken };
  } catch (err) {
    throw err;
  }
}

async function loginUser(username, password) {
  try {
    const user = await userModel.findOne({ username });
    // validate hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    const jwtToken = token.generateToken(username);

    // add token to the user object
    user.token = jwtToken;
    user.save();

    return {
      user,
      isPasswordValid,
      token: jwtToken,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUserByUsername,
  getUserById,
  deleteUser,
  registerUser,
  loginUser,
};
