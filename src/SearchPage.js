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
    });
  }

  clearQuery = () => {
    this.setState({
      query:'',
    })
  }

  render(){
    const {query} = this.state;
    let applicableBooks; 
    if(query) {
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
    }
      return(
      <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={query}
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
