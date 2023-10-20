const express = require("express");
const app = express();
const routes = require("./routes"); 

app.use(express.json());

// Use the routes
app.use("/api", routes);









const port=3000;
app.listen(port, () => {
    console.log(`server running at ${port}`);
  });
  