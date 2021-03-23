const Axios = require("axios");

exports.getCharacters = async (req, res) => {
  try {
    console.log(
      `https://rickandmortyapi.com/api/character?page=${req.query.page}`
    );
    const response = await Axios.get(
      `https://rickandmortyapi.com/api/character?page=${req.query.page}`
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
