import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new Book
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(404).send({
        message: "Send all required fields : title , author and publishYear ",
      });
    }

    const existedBook = await Book.find({ title: title });

    if (existedBook.length != 0) {
      return response.status(404).send({
        message: "Book already available",
        data: existedBook,
      });
    }

    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});

// Route for get all books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route for get one books from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findById(id);
    return response.status(200).send(books);
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route for update a book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(404).send({
        message: "Send all required fields : title , author and publishYear ",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message,
    });
  }
});

// Route for delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message,
    });
  }
});

export default router;
