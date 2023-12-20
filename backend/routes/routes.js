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

router.post('/uploadFile',upload.single('file'), async (req,res) =>{
    const file = req.file;
    console.log(file);
    return res.status(201).json({
        "messgae":"file uploaded successfully"
    })
})
router.post('/postBook',upload.single('file'), async(req,res) =>{
    console.log(req.body);
    console.log(req.file);


    if (!req.body) {
        res.status(400).json({
            "error": "Bad request",
            "message": "Request body is empty or missing"
        });
    }
    
    const bookProfile = req.file.path
    const {name,author,datePublished,publisher,language,category,year,rating} = req.body;
    const isbn = uuid.v4();
    

    //insert data into the database
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
        bookProfile
    })

    if(newBook){
        res.status(201).json({
            "message":"new book have been successfully created",
            "status":201,
        })
    }else{
        res.status(400).json({
            "message":"Bad request",
            "status":400
        })
    }

})
router.get('/getBookById/:id', async (req, res) => {
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
            return res.status(404).json({
                "message": "The book you are looking for does not exist",
                "status": 404
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "message": "Internal server error",
            "status": 500
        });
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
        return res.status(500).json({
            "error":"internal server error",
            "status":500
        })
        
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
        return res.status(500).json({
            'status':500,
            'Message':'Internal server error'
        })
        
    }

})

router.put('/updateBookById/:id', async (req,res) =>{
    if(!req.params || !req.body){
        res.status(501).json({
            "error":"Bad Request",
            "Message":"Request body is empty or request param is empty"
        })
    }
    const bookId = req.params['id'];
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