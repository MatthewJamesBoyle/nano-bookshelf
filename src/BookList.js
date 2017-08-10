import React,{Component} from 'react';
import Book from './Book';


export default class BookList extends Component {
    render() {
        return (
           <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {this.getRelevantBooks('currentlyReading')}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.getRelevantBooks('wantToRead')}

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getRelevantBooks('read')}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

        );
    }
    /**
     * @description This method takes a book status, and returns all the book that matches that status. For example,
     *  all the books a user has read.
     * @param{string} The status of the books you're interested in.
     */
     getRelevantBooks = (status) => {
      const booksMatchingStatus =  this.props.books.filter((book) =>{
          return book.shelf === status;
        });
        const booksMatchingStatusList = booksMatchingStatus.map(book =>{
          return(<li key={book.id}>
            <Book
              bookId={book.id}
              bookAuthor={book.authors[0]}
              bookTitle={book.title}
              bookCoverImage={book.imageLinks.thumbnail}
              move={this.props.move}
            />
          </li>)
          
        });
      return booksMatchingStatusList;
      
    } 


}