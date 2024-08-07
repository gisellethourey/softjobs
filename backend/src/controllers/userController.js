import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, getAllUsers } from '../models/userModel.js';

const newUser = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser({
        email,
        password: hashedPassword,
        rol,
        lenguage
      });
  
      if (user) {
        res.status(201).json({ message: 'User registered successfully', user });
      } else {
        res.status(500).json({ message: 'Please use another email' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
  
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'No users found' });
      }
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export { newUser, loginUser, getUsers };