const User = require('../model/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Name or password missing' });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypting password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    res.status(201).json({ success: `User ${newUser.username} added` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};
