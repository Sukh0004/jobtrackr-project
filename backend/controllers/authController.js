import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('🔐 Login attempt:', email, password);

    const user = await User.findOne({ email });
    console.log('🔎 User found:', user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', isMatch);

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    console.log('🪙 JWT token created:', token);

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('❌ Login failed:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
  // const { email, password } = req.body;
  // try {
    
  //   const user = await User.findOne({ email });
  //   if (!user) return res.status(404).json({ message: 'User not found' });

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  //   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  //   res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  // } catch (err) {
  //   res.status(500).json({ message: 'Login failed', error: err.message });
  // }
};