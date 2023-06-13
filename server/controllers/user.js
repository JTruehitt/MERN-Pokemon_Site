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
        throw new Error(`No user with username ${username} was found`);
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
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
      res.status(400)
        throw new Error('Invalid user data');
    }
    // Send back user data without password
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Update a user
// @route  PUT /api/users/:username
// @access Private
const updateUser = async (req, res, next) => {
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
        throw new Error(`No user with username ${username} was found`);
    }
    res.status(200).json({
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  } catch (err) {
    next(err);
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
        throw new Error(`No user with username ${username} was found`);
    }
    const correctPassword = await userConfirmed.checkPassword(password);
    if (!correctPassword) {
      res.status(401)
      throw new Error('Incorrect password');
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
    next(err);
  }
};

export { registerUser, getUser, updateUser, deleteUser };
