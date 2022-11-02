import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export class CommentController {
  static async createComment(req, res) {
    try {
      const { postId, comment } = req.body;

      if (!comment) return res.status(400).json({ message: 'Comment can not be empty!' });

      const newComment = new Comment({ comment });
      await newComment.save();

      try {
        await Post.findByIdAndUpdate(postId, {
          $push: { comments: newComment._id },
        });
      } catch (error) {
        console.log(error);
      }

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }
}
