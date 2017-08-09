import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import BookList from './BookList';

class BooksApp extends React.Component {
  state = {
    books:[],
  };

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books});
      console.log(books);
    });
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.state.books ?
            (<BookList books={this.state.books}/>):
            <div>Books loading!</div>}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default BooksApp