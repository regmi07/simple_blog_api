const authService = require("../services/authService");

async function register(req, res) {
  const { username, password } = req.body;

  // check if user already registered
  const existingUser = await authService.getUserByUsername(username);
  if (existingUser) {
    return res.status(409).send("user already exists");
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Invalid password! Password must be 6 characters or more",
    });
  }

  try {
    const { newUser, token } = await authService.registerUser(
      username,
      password
    );

    // send cookie with token
    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: process.env.MAX_AGE * 1000,
    });

    //response status and display the created user
    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    return res.status(401).json({
      message: "User not created",
      error: err.message,
    });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username or password is empty!" });
  }

  try {
    const { user, isPasswordValid, token } = await authService.loginUser(
      username,
      password
    );

    if (!user) {
      return res.status(401).json({
        message: "Couldn't login user!",
        error: "User not found",
      });
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password!",
      });
    }

    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: process.env.MAX_AGE * 1000,
    });

    return res.status(200).json({
      message: "Login successful!",
      user,
    });
  } catch (err) {
    res.status(401).json({
      message: "Something went wron while logging in user!",
      error: err.message,
    });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User id not found!" });
  }

  try {
    const user = await authService.deleteUser(id);
    //if user doesn't exist then we can't do anything
    if (!user) {
      return res.status(404).json({
        message: "User could not be deleted!",
        error: "User not found!",
      });
    }
    //return success if the user is deleted
    return res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    return res.status(409).json({
      message: "User was not deleted!",
      error: err.message,
    });
  }
}

module.exports = { register, deleteUser, login };
