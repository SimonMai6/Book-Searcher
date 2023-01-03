const router = require('express').Router();

const bookAPI = require('book-api');

//format the retrieved data
const _formatResults = (facts) => {
    //array storing all the book names and id
    let books = []
    for (let i = 0; facts.length > i; ++i){
        books.push({name: facts[i].volumeInfo.title, id : facts[i].id})
    }

    const data = {
        "count" : facts.length,
        "results" : books
    };
    return data;
}

// GET /book
router.get('/book', async (req, res) => {
    try {
        //retrieve the keyword from search
        const data = req.query;
        const {keyword} = data;

        //use the keyword and findbook() function in the book-api to find the books that have the keyword in it
        const nameList = await bookAPI.findBook(keyword);

        //getting all the books information only
        const {items} = nameList;

        //google api allows default 10 returns, and the maximum allowable value is 40 returns
        const results = _formatResults(items);
        
        
        res.json(results);
       
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// POST /book/details
router.post('/book/details', async (req, res) => {
    try {
        //retrieve the id, keyword, and counts from body
        const { id, keyword, counts } = req.body;

        //return the book that is found by using the book id
        const finalReturn = await bookAPI.returnBook(id);

        //History information
        const title = finalReturn.volumeInfo.title
        const date =  Date(); 
        const history = {keyword:keyword, counts:counts, selectedId:id, selectedText:title, timestamp:date };

        // insert the results into MongoDB
        const db = req.app.locals.db;
        const collection = db.collection('Search');
        await collection.insertOne(history);

        
        res.json(finalReturn);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;