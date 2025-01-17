// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     user = new User({
//       name,
//       email,
//       password
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Return user data instead of token
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      personalDetails: user.personalDetails
    });

  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Simple password check
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user data instead of token
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      personalDetails: user.personalDetails
    });

    if (this.login) {
      this.login = true;
      console.log('Login successful');
    }

  } catch (err) {
    res.status(500).send('Server error');
  }
};