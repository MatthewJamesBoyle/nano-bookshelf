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

    moveBook = (eventVal,id) => {
       const newShelf = eventVal;
      //  change this to be a full book object.
       BooksAPI.update({id},newShelf)
       .then((response)=> {
        //  console.log(response);
       });
       const booksToUpdate = this.state.books.filter(book => book.id === id);
       //I am sure this is always going to return one element, but lets put it behind a foreach guard.
       booksToUpdate.forEach(book => book.shelf =  newShelf );
        const stateWithoutId = this.state.books.filter(book=> book.id !== id);
        const newState = [...stateWithoutId,...booksToUpdate];
        this.setState(newState);

     }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({history})=>(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
          {this.state.books ?
          (<BookList books={this.state.books} move={this.moveBook} />):
          <div>Books loading!</div>}
          <div className="open-search">
            <a onClick={() => history.push("/search") }>Add a book</a>
          </div>
        </div>
        )}/>
        <Route exact path="/search" render={({history})=> (
          <SearchPage
            move={this.moveBook}
            history={history}
          />
        )}/>        
      </div>
    )
  }
}

export default BooksApp


