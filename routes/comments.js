const { validateComment, validateReply, Comment, Reply } = require('../models/comment');
const express = require('express');
const router = express.Router();


// get all comments
router.get('/', async (req, res) => {
   try {
      const comments = await Comment.find();
      return res.send(comments);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// Get comment by video id
router.get('/:videoId', async (req, res) => {
   try {
      const comment = await Comment.find({ videoId: req.params.videoId });
      console.log(comment);
      if (!comment)
         return res.status(400).send(`The comment with id "${req.params.videoId}" d
   oes not exist.`);
      return res.send(comment);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// Post new comment
router.post('/', async (req, res) => {
   try {
      // Need to validate body before continuing
      const { error } = validateComment(req.body);
      if (error)
         return res.status(400).send(error);

      const comment = new Comment({
         text: req.body.text,
         likes: req.body.likes,
         dislikes: req.body.dislikes,
         videoId: req.body.videoId,
         replies: [],
      });
      await comment.save();
      return res.send(comment);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// Put comment likes & dislikes
router.put('/:commentId', async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment)
         return res.status(400).send(`The comment with id "${req.params.commentId}" d
   oes not exist.`);

      // Need to validate body before continuing
      const { error } = validateComment(req.body);
      if (error)
         return res.status(400).send(error);

      // update likes & dislikes
      comment.likes = req.body.likes
      comment.dislikes = req.body.dislikes

      await comment.save();
      return res.send(comment);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// Post reply to comment
router.post('/:commentId', async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.commentId);

      const { error } = validateReply(req.body);
      if (error)
         return res.status(400).send(error);

      if (!comment)
         return res.status(400).send(`The comment with id "${req.params.commentId}" d
   oes not exist.`);

      const reply = new Reply({
         text: req.body.text,
      });

      comment.replies.push(reply);
      await comment.save();

      return res.send(comment);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

module.exports = router;