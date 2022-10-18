const books = require("../data/books");

const getAll = async (req, res) => {
  return res.status(200).json({
    message: "success",
    data: books,
  });
};

module.exports = {
  getAll,
};
