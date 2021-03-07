const quotes = require('../quotes.json');

module.exports.fetchQuotes = (req, res) => {
    res.status(200).send(quotes);
}