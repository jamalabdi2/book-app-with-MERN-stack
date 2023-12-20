import React from "react";

const BookCard = ({ book }) => {
  const { name, author, category, datePublished,bookProfile,rating,language,year } = book;

  return (
    <div className="book-card">
      <img src={bookProfile} alt={name} />
      <div className="book-details">
        <h3>{name}</h3>
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
