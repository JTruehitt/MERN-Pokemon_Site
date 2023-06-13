import User from '../models/User.js';

// @desc    Get a user by username
// @route   GET /api/users/:username
// @access  Public
const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      res
        .status(404)
        .json({ 'Not Found': `No user with username ${username}` });
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ 'Server Error': error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    if (!user) {
      res.status(400).json({ 'Bad Request': 'Invalid user data' });
    }
    // Send back user data without password
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ 'Server Error': error.message });
  }
};

// @desc   Update a user
// @route  PUT /api/users/:username
// @access Private
const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userData = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        username,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!userData) {
      res
        .status(404)
        .json({ 'Not Found': `No user with username ${username}` });
      return;
    }
    res.status(200).json({
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ 'Server Error': err.message });
  }
};

// @desc   Delete a user
// @route  DELETE /api/users/:username
// @access Private
// this code will verify the user exists, verify they entered the correct password, and then delete the user
const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    const userConfirmed = await User.findOne({ username });
    if (!userConfirmed) {
      res
        .status(404)
        .json({ 'Not Found': `No user with username ${username}` });
      return;
    }
    const correctPassword = await userConfirmed.checkPassword(password);
    if (!correctPassword) {
      res.status(401).json({ Unauthorized: 'Incorrect password' });
      return;
    }
    const deletedUser = await User.findOneAndDelete({ username });
    res.status(200).json({
      _id: deletedUser._id,
      username: deletedUser.username,
      email: deletedUser.email,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'Server Error': err.message });
  }
};

export { registerUser, getUser, updateUser, deleteUser };
