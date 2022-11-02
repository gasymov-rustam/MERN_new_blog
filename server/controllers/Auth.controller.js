import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      const isUser = await User.findOne({ username });

      if (isUser) {
        return res.status(402).json({ message: 'User with this name yet exist' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hash,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      const userData = {
        _id: newUser._id,
        username: newUser.username,
        createdAt: newUser?.createdAt,
        updatedAt: newUser?.updatedAt,
      };

      res.status(201).json({
        ...userData,
        token,
        message: 'Successfully registered!',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(403).json({
          message: 'User is not exist',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(403).json({
          message: 'Incorrect password or username',
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      const userData = {
        _id: user._id,
        username: user.username,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      };

      res.status(200).json({
        token,
        ...userData,
        message: 'Successfully sign in',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong during authorization', error });
    }
  }

  static async getMe(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(403).json({
          message: 'User is not exist',
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      const userData = {
        _id: user._id,
        username: user.username,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      };

      res.status(200).json({
        ...userData,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Forbidden!' });
    }
  }
}
