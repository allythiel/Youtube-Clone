const { validateComment, validateReply, Comment, Reply } = require('../models/comment');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
   try {
      const comments = await Comment.find();
      return res.send(comments);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// // Get card decks by id
// router.get('/:deckId', async (req, res) => {
//    try {
//       const comment = await CardDeck.findById(req.params.deckId);
//       console.log(cardDeck);
//       if (!cardDeck)
//          return res.status(400).send(`The card deck with id "${req.params.deckId}" d
//    oes not exist.`);
//       return res.send(cardDeck);
//    } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//    }
// });

// // create new card deck
// router.post('/', async (req, res) => {
//    try {
//       // Need to validate body before continuing
//       const { error } = validateCardDeck(req.body);
//       if (error)
//          return res.status(400).send(error);

//       const cardDeck = new CardDeck({
//          title: req.body.title,
//          description: req.body.description,
//          cards: req.body.cards,
//       });
//       await cardDeck.save();
//       return res.send(cardDeck);
//    } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//    }
// });


module.exports = router;