import React from "react";
import {Link} from "react-router-dom";

const BookCard = ({ book }) => {
  const { name, author, category, datePublished,bookProfile,rating,language,year,_id } = book;
  return (
    <div className="book-card">
      <img src={bookProfile} alt={name} />
      <div className="book-details">
        <Link to ={_id}>{name}</Link>
        <p>Author: {author}</p>
        <p>Category: {category}</p>
        <p>Date Published: {datePublished}</p>
        <p>Rating: {rating}</p>
        <p>Language: {language}</p>
        <p>Year: {year}</p>
      </div>
    </div>
  );
};

export default BookCard;
