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

export { registerUser, getUser };
