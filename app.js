// DB Name = Sagar-Shopping-List-App
// Collections = {
//items
//}

const express = require("express");
const app = express()
const path = require('path');
const { ppid } = require("process");
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const Item = require('./models/item');



mongoose.connect("mongodb://localhost:27017/Sagar-Shopping-List-App", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log("Database Connected")
})

app.use(express.static(path.join(__dirname, '/public')))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views')) //to ensure ejs views is found from being run anywhere out of the folder of index.js
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('pages/home')
});

app.get('/items', async (req, res) => {
    const items = await Item.find({});
    res.render('pages/list', { items })
});

app.get('/items/new', (req, res) => {
    res.render('pages/new')
});

app.post('/items', async (req, res) => {
    const item = new Item(req.body.item);
    await item.save();
    res.redirect(`/items/${item._id}`)
});

app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    res.render('pages/item', { item })
});

app.get('/items/:id/edit', (req, res) => {
    res.send("Edit Details About Item")
});

// routes are matched in order, so * has to be last
app.get('*', (req, res) => {
    res.render('pages/page-not-found')
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
