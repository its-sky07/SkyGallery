// models/Post.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
