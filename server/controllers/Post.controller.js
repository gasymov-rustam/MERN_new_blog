import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export class PostController {
  static async getAll(req, res) {
    try {
      const posts = await Post.find().sort('-createdAt');
      const popularPosts = await Post.find().limit(5).sort('-views');

      if (!posts) {
        return res.status(400).json({ message: 'Posts is not exist!' });
      }

      res.status(200).json({ posts, popularPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async getMyPosts(req, res) {
    try {
      const user = await User.findById(req.userId);

      const list = await Promise.all(
        user.posts.map((post) => {
          return Post.findById(post._id);
        })
      );
      console.log();
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async getById(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { returnDocument: 'after' }
      );

      if (!post) {
        return res.status(400).json({ message: 'Post is not exist' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async getPostComments(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      const list = await Promise.all(
        post.comments.map((comment) => {
          return Comment.findById(comment);
        })
      );

      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async createPost(req, res) {
    try {
      const { title, text } = req.body;
      const user = await User.findById(req.userId);

      if (req.files) {
        const fileName = Date.now().toString() + req.files.image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));

        if (!fs.existsSync('uploads')) {
          fs.mkdirSync('uploads');
        }
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

        const newPostWithImage = new Post({
          username: user.username,
          title,
          text,
          imgUrl: fileName,
          author: req.userId,
        });

        await newPostWithImage.save();

        await User.findByIdAndUpdate(req.userId, {
          $push: { posts: newPostWithImage },
        });

        return res.status(200).json(newPostWithImage);
      }

      const newPostWithoutImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: '',
        author: req.userId,
      });

      await newPostWithoutImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithoutImage },
      });

      res.status(201).json(newPostWithoutImage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async updatePost(req, res) {
    try {
      const { title, text, id } = req.body;
      const post = await Post.findById(id);

      if (req.files) {
        const fileName = Date.now().toString() + req.files.image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
        post.imgUrl = fileName ?? '';
      }

      post.title = title;
      post.text = text;

      await post.save();

      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

  static async removePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(400).json({ message: 'Post is not exist' });

      await User.findByIdAndUpdate(req.userId, {
        $pull: { posts: req.params.id },
      });

      await Promise.all(
        post?.comments.map(async (comment) => {
          await Comment.findByIdAndRemove(comment._id);
        })
      );

      res.json({ message: 'Past has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }
}
