const express = require('express');
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/pitly').then(() => {
    console.log('MongoDB connected...');
}).catch((err) => {
    console.log(err);
});

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
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`))
