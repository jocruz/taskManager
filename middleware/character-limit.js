const characterLimit = (req, res) =>
  res.status(500).send("Character limit is passed its max");

module.exports = characterLimit;
