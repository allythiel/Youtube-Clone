const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema({
   text: { type: String, required: true, minLength: 5, maxLength: 1000 },
   dateAdded: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
   text: { type: String, required: true, minLength: 5, maxLength: 1000 },
   dateAdded: { type: Date, default: Date.now },
   likes: { type: Number, required: true, default: 0 },
   dislikes: { type: Number, required: true, default: 0 },
   replies: [{ type: replySchema }],
   videoId: { type: String, required: true, minLength: 4, maxLength: 50 },
});

const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
   const schema = Joi.object({
      text: Joi.string().min(5).max(1000).required(),
      likes: Joi.number().required(),
      dislikes: Joi.number().required(),
      replies: Joi.array(),
      videoId: Joi.string().min(4).max(50).required(),
   });
   return schema.validate(comment);
}

function validateReply(reply) {
   const schema = Joi.object({
      text: Joi.string().min(5).max(1000).required(),
   });
   return schema.validate(reply);
}

module.exports = {
   Reply: Reply,
   Comment: Comment,
   validateComment: validateComment,
   validateReply: validateReply
};

