const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const productRouter = require("./routes/product.router");
const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "RESTful API For SE Shop",
    version: "1.0.0",
  },
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "GitHub",
      url: "https://github.com",
    },
    contact: {
      name: "KITTIPONG",
      url: "https://github.com",
      email: "Kittipong@hotmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

//donfig .env
dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

//console.log(CLIENT_URL);

app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//database connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => {
  res.send("<h1>This is a RESTful API for SE Shop</h1>");
});
//Add Router
app.use("/products", productRouter);
//RunServer
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});