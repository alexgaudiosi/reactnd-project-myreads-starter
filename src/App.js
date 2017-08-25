import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  // This doesn't feel quite right, in order to get the library to update after adding a new book I had to call .getAll()
  // (not necessary for changing shelves), what would be a cleaner way here? Would you have to take the newly added book
  // object and append to books state? (filling in any gaps with in the object)

  updateCategory = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    });
  }

  //  Repetition here to pass state down the tree to child components, I'm guessing redux helps with that?

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateCategory={(book, shelf) => {
              this.updateCategory(book, shelf);
            }}
          />
        )}/>
         <Route path="/search" render={({ history }) => (
           <SearchBooks
            books={this.state.books}
            onUpdateCategory={(book, shelf) => {
              this.updateCategory(book, shelf);
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
