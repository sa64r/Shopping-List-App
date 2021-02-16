const mongoose = require('mongoose');
const Item = require('../models/item')
mongoose.connect("mongodb://localhost:27017/Sagar-Shopping-List-App", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log("Database Connected");
});

const seedDB = async () => {
    await Item.deleteMany({});
    const item = new Item({
        title: "Apple",
        quantity: 4
    })
    await item.save();
}

seedDB().then(() => {
    mongoose.connection.close()
})