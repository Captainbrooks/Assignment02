const express = require("express");
const Product = require("./productDB"); 
const router = express.Router();


router.get("/",(req,res)=>{
    try{
        res.json({message:"Welcome to the marketplace app"})
    }catch(e){
        res.json("Couldn't fetch !!!");
    }
   
});


// Getting all the products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        if(!products){
            res.json({message:"No products found"})
        }
        else{
          
            res.status(200).json(products);
        }
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Getting the product with specific id 
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Adding a product into a database
router.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Making change into a database
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Deleting the product from the database using a specific id
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
      
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(deletedProduct);
       
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Deleting the all the products from the database
router.delete("/products", async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(204).json({ message: "All products have been deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// D
router.get("/Products", async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name });
        if (!products || products.length === 0) {
            res.status(404).json({ error: `No products found with name "${name}"` });
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;
