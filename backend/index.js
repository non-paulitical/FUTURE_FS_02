const express = require('express');
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const cors = require('cors');

const app = express();
const PORT = 3001;

connectToMongoDB('mongodb://localhost:27017/pitly').then(() => {
    console.log('MongoDB connected...');
}).catch((err) => {
    console.log(err);
});

app.use(cors());

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    time: Date.now()
                }
            }
        }
    );
    try {
        res.redirect(entry.redirectURL);
    } catch {
        res.sendStatus(404);
    }
})

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`))
