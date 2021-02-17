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
    const item1 = new Item({
        title: "Apple",
        quantity: 4,
        description: "Golden delicious apple, finest in all the land."
    })
    await item1.save();

    const item2 = new Item({
        title: "Mangos",
        quantity: 100,
        description: "The juciest mango from the hills of the Morrocan countryside"
    })
    await item2.save();
}

seedDB().then(() => {
    mongoose.connection.close()
})