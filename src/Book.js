import React, {Component} from 'react';

class Book extends Component {
    render() {
        return(
             <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCoverImage})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={event => this.props.move(event.target.value,this.props.bookId)}>
                        <option value="none" >Move to...</option>
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

   

}

export default Book;