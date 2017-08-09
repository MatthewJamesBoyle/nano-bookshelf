import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';


class Book extends Component {
    render() {
        return(
             <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCoverImage})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={this.moveBook}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.bookAuthor}</div>
            </div>
        );
    }

     moveBook = (event) => {
       const newShelf = event.target.value;
      //  change this to be a full book object.
       BooksAPI.update({id:this.props.id},newShelf)
       .then((response)=>{
         console.log(response);
       })
     }

}

export default Book;