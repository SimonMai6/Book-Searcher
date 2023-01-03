const superagent =  require('superagent');

const config = require('./config.json');

const findBook = async (bookLibrary) => {
    try {
        const bookURL = `${config.url}volumes?q=${bookLibrary}&maxResults=40`;
        const response = await superagent.get(bookURL);
        return response.body;
    } catch (error) {
        return error;
    }
};

const returnBook = async (id) => {
    try {
        const bookFactsURL = `${config.url}volumes/${id}`;
        const response = await superagent.get(bookFactsURL);
        return response.body;
    } catch (error) {
        return error;
    }
};

module.exports = {
    findBook,
    returnBook
};