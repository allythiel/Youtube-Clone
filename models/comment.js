const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    text: { type: String, required: true, minLength: 5, maxLength: 1000 }, 
    dateAdded: { type: Date, default: Date.now },
});

const commentSchema = mongoose.Schema({
    text: { type: String, required: true, minLength: 5, maxLength: 1000 },
    dateAdded: { type: Date, default: Date.now },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    reply: [{ type: replySchema }],
    videoId: { type: String, required: true, minLength: 4, maxLength: 50 },
});

const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Reply: Reply,
    Comment: Comment,
};