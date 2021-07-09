const router = require("express").Router();
const Conversation = require("../Models/Conversation");

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const allConversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(allConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;