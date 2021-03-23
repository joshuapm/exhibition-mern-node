const db = require("../models");
const User = db.user;

exports.updateFavoriteCharacters = (req, res) => {
  if (!req.body.characterId) {
    return res.status(400).send({ message: "Character ID is required!" });
  }

  User.findOne({
    _id: req.userId
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const index = user.favoriteCharacters.indexOf(req.body.characterId);
    if (index === -1) {
      user.favoriteCharacters.push(req.body.characterId);
    } else {
      user.favoriteCharacters.splice(index, 1);
    }

    user.markModified();

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        favoriteCharacters: user.favoriteCharacters,
        accessToken: req.headers["x-access-token"]
      });
    });
  });
};
