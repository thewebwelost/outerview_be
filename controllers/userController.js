const User = require('../model/User');

const getUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'No user Id was provided' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${req.params.id} not found` });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};
