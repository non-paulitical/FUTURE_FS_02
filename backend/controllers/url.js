const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateShortURL(res, req) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is requried.' });
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({ id: shortID });

}

module.exports = { handleGenerateShortURL };