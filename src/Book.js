import React from 'react';

/**
 * @description stateless functional component that takes props and returns a book.
 * @param {*} props contains the details needs for a book; bookCoverImage,move (the move function),bookTitle and bookAuthor
 */
const Book = (props) => {
        return(
             <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookCoverImage})` }}></div>
                    <div className="book-shelf-changer">
                    {console.log(props.bookTitle+','+props.shelf)}
                      <select value={props.shelf || "none"} onChange={event => props.move(event.target.value,props.bookId)}>
                        <option disabled >Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                <div className="book-title">{props.bookTitle}</div>
                <div className="book-authors">{props.bookAuthor}</div>
            </div>
        );
    }

export default Book;