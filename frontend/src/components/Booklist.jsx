import React from "react"
import { useState,useEffect } from "react"
import BookCard from "./BookCard";

export default function Booklist(){
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    const allBooksUrl = 'http://localhost:5400/bookapi/v1/getBooks';

    useEffect(() =>{
        fetch(allBooksUrl)
        .then(response => response.json())
        .then(data =>{
            const allBooks = data.books;
            setBooks(allBooks)
            setLoading(false);
            console.log(allBooks)
        }).catch(error =>console.error(error))

    },[])
    
    return (
        <div className="bookDisplayContainer">
            <h2>Lists of Books</h2>
            {loading? 
            (<p>Loading ....</p>)
            :(
              <ul>
                {books.map(book =>(
                    <BookCard key = {book._id} book={book}/>
                ))}
              </ul>

            )}
        </div>
    )

}
