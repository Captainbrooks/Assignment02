const mongoose = require("mongoose");

// Define the Mongoose schema here
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    category: {
        type: String,
    }
});

// Create a model from the schema
const Product = mongoose.model("Product", productSchema);

// Connecting to a database to the database
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.oblakf8.mongodb.net/Marketplace', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
     
        console.log("Database is connected");
    })
    .catch((e) => {
        console.error(e);
    });

module.exports = Product;
