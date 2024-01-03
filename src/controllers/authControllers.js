const bcrypt = require('bcryptjs');
const User = require("../models/user.models.js");
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ user: { id: user._id } }, SECRET_KEY);
        res.json({ token });
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
};

module.exports = { signup, login };