import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import BookList from './BookList';

/**
 * This component is the one that is mounted when the applciation is run. 
 * 
 */
class BooksApp extends React.Component {
  
  state = {
    books:[],
  };

  /**
   * @description Called before the componenet mounts, and contains code to get all the books in the api. 
   * it adds this info in this.state.books
   */
  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books});
    });
  }
    /**
     * @description this method is passed down the tree to allow children to update which shelf they are on.
     * @param{string} eventVal, contains data from the dropdown info and is used to decide which shelf to move to.
     * @param{id} the id of the book to move.
     */
    moveBook = (eventVal,id) => {
       const newShelf = eventVal;
      //  change this to be a full book object.
       BooksAPI.update({id},newShelf)
       .then((response)=> {
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
          {console.log(this.state)}
        </div>
        )}/>
        <Route exact path="/search" render={({history})=> (
          <SearchPage
            move={this.moveBook}
            history={history}
            books={this.state.books}
          />
        )}/>        
      </div>
    )
  }
}

export default BooksApp


