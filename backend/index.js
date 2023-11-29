import express, { request, response } from "express";
import { PORT, MONGOURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1 : Allow all Origins with default of cors(*)
app.use(cors());
// Option 2 : Allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", bookRoutes);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`Server running at : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
