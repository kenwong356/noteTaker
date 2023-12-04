const express = require('express');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

const apiRoute = express.Router();

apiRoute.get('/', async (req, res) => {
    try {
        const data = await readFromFile('./db/db.json');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

apiRoute.post('/', async (req, res) => {
    try {
        const { title, text } = req.body;

        if (title && text) {
            const newNote = {
                title,
                text,
                id: uuidv4(),
            };

            await readAndAppend(newNote, './db/db.json');
            res.json('Note added');
        } else {
            res.status(400).send('Error: Missing title or text');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
module.exports = apiRoute;