import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book'
import {Link} from 'react-router-dom';
export default class SearchPage extends Component {
  state = {
    query: '',
    books:[]
  }

  updateQuery =(query) => {
    this.setState({
      query
    })

     BooksAPI.search(query,20).then(results => {
        if(results.length > 0) {
          this.setState({
            books:results
          })
        } else {
          this.setState({
            books:[]
          })
        }
      })
      .catch(e=> console.log(e));
  }

  clearQuery = () => {
    this.setState({
      query:'',
    })
  }
    getShelf = (bookid) =>{
      var toReturn = 'none';
      this.props.books.forEach((book)  => {
        if(book.id === bookid)
         toReturn =  book.shelf;
      });
      return toReturn;
    }

  render() {    
      return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search" 
              />
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={event => this.updateQuery(event.target.value)}
                />     
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {this.state.books.length ? (
                 this.state.books.map((book) => {
                  return (
                    <li key={book.id}>
                       <Book
                          bookId={book.id}
                          bookAuthor={book.authors}
                          bookTitle={book.title}
                          bookCoverImage={book.imageLinks.thumbnail}
                          move={this.props.move}
                          shelf={this.getShelf(book.id)}
                        />
                    </li>)
                  })
               ):<div>Your search result is empty!</div>}
              </ol>
            </div>
          </div>
      );
  }
}
