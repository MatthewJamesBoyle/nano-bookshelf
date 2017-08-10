import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book'
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

  render() {    
      return(
      <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.props.history.push("/") }>Close</a>
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
