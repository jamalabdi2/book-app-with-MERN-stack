const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const bookModel = require('../model/bookModel');
const upload = require('../multerConfig')
/*
postBook
getBookById
getBooks
deleteBookById
updateBookById
*/

router.post('/postBook', async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.body) {
            res.status(400);
            throw new Error("Bad Request, Request body is empty or missing");
        }

        const { name, author, datePublished, publisher, language, category, year, rating } = req.body;
        const isbn = uuid.v4();

        // insert data into the database
        const newBook = await bookModel.create({
            isbn,
            name,
            author,
            datePublished,
            publisher,
            category,
            language,
            year,
            rating,
        });

        if (newBook) {
            res.status(201).json({
                "message": "new book has been successfully created",
                "status": 201,
            });
        } else {
            res.status(400);
            throw new Error("Bad request");
        }
    } catch (error) {
        // Pass the error to the next middleware (errorMiddleware)
        next(error);
    }
});

router.get('/getBookById/:id', async (req, res,next) => {
    const bookId = req.params.id;
    console.log(`Book id is: ${bookId}`);
    
    try {
        const book = await bookModel.findById(bookId);

        if (book) {
            return res.status(200).json({
                "status": 200,
                "book": book
            });
        } else {
            res.status(404)
            throw new Error("The book you are looking for does not exist")
        }
    } catch (error) {
        console.error(error);
        next(error);
       
    }
});

router.get('/getBooks', async (req,res) =>{
    try {
        const allBooks = await bookModel.find();
        if(allBooks.length === 0){
            return res.status(404).json({
                "Status code":404,
                "Message":"No Books found"
            })
            
        }
        return res.status(200).json({
            "status":200,
            "books":allBooks,
        })



        
    } catch (error) {
        res.status(500)
        throw new Error("internal server error")
    }

})

router.delete('/deleteBookById/:id', async (req,res) =>{
    const bookId = req.params['id'];
    const book = await bookModel.findById(bookId);
    if(!book){
        res.status(404).json({
            "message":"book does not exist",
            "status":404
        })
    }
    try {
        await bookModel.findByIdAndDelete(bookId);
        res.status(200).json({
            "message":"book deleted successfully",
            "status":200
        })
        
    } catch (error) {
        res.status(500)
        throw new Error("Internal server error")
        
    }

})

router.put('/updateBookById/:id', async (req,res) =>{
    if(!req.params.id){
        res.status(400)
        throw new Error("Id parameter must be set")
    }
    const bookId = req.params.id;
    const updatedBookInfo = req.body;
    console.log(`Book id: ${bookId}`);

    try {
        const book = await bookModel.findById(bookId);
        if(!book){
            return res.status(404).json({
                "status":404,
                "message":"book with that id is not found"
            })
        }
        const updatedBook = await bookModel.findByIdAndUpdate(bookId,updatedBookInfo,{new:true})
        res.status(200).json({
            "status":200,
            "message":"book updated successfully",
            "updated Book":updatedBook
        })
        
    } catch (error) {
        res.status(500).json({
            "message":"internal server error"
        })
        
    }

})

module.exports = router;